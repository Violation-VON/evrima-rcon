/*!
 * evrima-rcon — TypeScript RCON client for The Isle: Evrima.
 * Copyright (C) 2026  Violation
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import net from "node:net";
import { on } from "node:events";
import { ConnectionOptions } from "./ConnectionOptions.ts";
import { Player } from "./Player.ts";
import { Character } from "./Character.ts";
import { Gender } from "./Gender.ts";

type MessageEnd = (reply: string) => number;

const enum Packet {
  AUTH = 0x01,
  COMMAND = 0x02,
}

const enum Opcode {
  ANNOUNCE = 0x10,
  WIPE_CORPSES = 0x13,
  BAN = 0x20,
  KICK = 0x30,
  LIST_PLAYERS = 0x40,
  GET_PLAYER_DATA = 0x77,
}

/**
 * Client for the Evrima RCON protocol.
 */
export class EvrimaRCON {
  /**
   * Default RCON port.
   */
  public static readonly DEFAULT_PORT = 8888;

  /**
   * Default reply timeout in milliseconds.
   */
  public static readonly DEFAULT_TIMEOUT = 500;

  /**
   * Ban duration in seconds that bans permanently.
   */
  public static readonly PERMANENT_BAN = 0;

  private static readonly LF = "\n";
  private static readonly INCOMPLETE = -1;
  private static readonly ANNOUNCEMENT_LIMIT = 511;
  private static readonly TIMESTAMP = "[YYYY.MM.DD-HH.MM.SS] ";
  private static readonly PLAYER_ID_LENGTH = 32;

  private readonly options: Required<ConnectionOptions>;
  private socket = new net.Socket();
  private connected = false;
  private queue: Promise<void> = Promise.resolve();

  /**
   * Creates a client.
   *
   * @param options Connection options.
   */
  public constructor(options: ConnectionOptions) {
    this.options = {
      ...options,
      port: options.port ?? EvrimaRCON.DEFAULT_PORT,
      timeout: options.timeout ?? EvrimaRCON.DEFAULT_TIMEOUT,
    };
  }

  /**
   * Connects to the server and authenticates.
   *
   * @throws {@link !Error} if authentication fails.
   */
  public async connect(): Promise<void> {
    this.close();

    const socket = new net.Socket();
    this.socket = socket;

    socket.setNoDelay(true);
    socket.on("error", () => socket.destroy());
    socket.on("close", () => {
      if (this.socket === socket) this.connected = false;
    });

    await new Promise<void>((resolve, reject) => {
      socket.once("connect", resolve);
      socket.once("error", reject);
      socket.connect(this.options.port, this.options.host);
    });

    const reply = await this.exchange(
      EvrimaRCON.frame([Packet.AUTH], this.options.password),
      (text) => text.length,
    );

    if (reply !== "Password Accepted") {
      this.close();
      throw new Error("Authentication failed");
    }

    this.connected = true;
  }

  /**
   * Closes the connection to the server.
   */
  public close(): void {
    this.connected = false;
    this.socket.destroy();
  }

  /**
   * Sends an announcement message to all online players.
   *
   * @param message Message text; max 998 characters.
   * @throws {@link !Error} if not connected.
   */
  public async announce(message: string): Promise<void> {
    if (
      await this.send(
        Opcode.ANNOUNCE,
        EvrimaRCON.withTimestamp(
          "Announcement Sent: ".length +
            Math.min(EvrimaRCON.ANNOUNCEMENT_LIMIT, message.length),
        ),
        message,
      ) === ""
    ) throw new Error("Announcement not acknowledged");
  }

  /**
   * Wipes all corpses.
   *
   * @throws {@link !Error} if not connected.
   */
  public async wipeCorpses(): Promise<void> {
    if (
      await this.send(
        Opcode.WIPE_CORPSES,
        EvrimaRCON.withTimestamp("Corpses wiped".length),
      ) === ""
    ) throw new Error("Corpse wipe not acknowledged");
  }

  /**
   * Kicks a player.
   *
   * @param steamId SteamID64 of the player.
   * @param reason Reason; must not contain `,`.
   * @returns whether the player was online and got kicked.
   * @throws {@link !Error} if not connected.
   */
  public async kick(steamId: string, reason: string): Promise<boolean> {
    return await this.send(
      Opcode.KICK,
      EvrimaRCON.withTimestamp(
        "Player ".length + EvrimaRCON.PLAYER_ID_LENGTH + " was kicked".length,
      ),
      [steamId, reason].join(","),
    ) !== "";
  }

  /**
   * Bans a player.
   *
   * @param name Name of the player.
   * @param steamId SteamID64 of the player.
   * @param reason Reason; must not contain `,`.
   * @param duration Duration in seconds; `0`, `null` and `Infinity` ban permanently.
   * @returns whether the player was online and got kicked; the ban applies either way.
   * @throws {@link !RangeError} if the duration is not a non-negative integer, `Infinity` or `null`.
   * @throws {@link !Error} if not connected.
   */
  public async ban(
    name: string,
    steamId: string,
    reason: string,
    duration: number | null = EvrimaRCON.PERMANENT_BAN,
  ): Promise<boolean> {
    const seconds = duration === null || duration === Infinity
      ? EvrimaRCON.PERMANENT_BAN
      : duration;

    if (!Number.isInteger(seconds) || seconds < 0) {
      throw new RangeError(
        "Ban duration must be a non-negative integer, Infinity or null",
      );
    }

    return await this.send(
      Opcode.BAN,
      EvrimaRCON.withTimestamp(
        "Player ".length + EvrimaRCON.PLAYER_ID_LENGTH +
          " was kicked and banned".length,
      ),
      [name, steamId, reason, seconds].join(","),
    ) !== "";
  }

  /**
   * Lists online players.
   *
   * @returns Online players.
   * @throws {@link !Error} if not connected.
   */
  public async listPlayers(): Promise<Player[]> {
    const commas = (line: string): number => line.split(",").length - 1;

    const reply = await this.send(Opcode.LIST_PLAYERS, (text) => {
      const [, idLine, nameLine] = text.split(EvrimaRCON.LF);
      return nameLine !== undefined && commas(nameLine) >= commas(idLine)
        ? text.length
        : EvrimaRCON.INCOMPLETE;
    });

    if (reply === "") throw new Error("No player list received.");

    const [, ids, names] = reply.split(EvrimaRCON.LF);
    const nameList = names.split(",");
    return ids.split(",").slice(0, commas(ids)).map((id, index) => ({
      id,
      name: nameList[index],
    }));
  }

  /**
   * Lists character data of all online players.
   *
   * @returns Character data of each online player.
   * @throws {@link !Error} if not connected.
   */
  public async listPlayerData(): Promise<Character[]> {
    const reply = await this.send(
      Opcode.GET_PLAYER_DATA,
      (text) =>
        text.endsWith(`PlayerDataEnd${EvrimaRCON.LF}`)
          ? text.length
          : EvrimaRCON.INCOMPLETE,
    );

    if (reply === "") throw new Error("No player data received");

    const mutations = (slots: string) =>
      slots.slice(1, -1).split(",", 4).map((slot) => slot.split("=")[1]).map((
        mutation,
      ) => (mutation === "None" ? null : mutation)) as [
        string | null,
        string | null,
        string | null,
        string | null,
      ];

    return reply.split(EvrimaRCON.LF).filter((line) =>
      line.startsWith("Name: ")
    ).map((line) => {
      const fields = Object.fromEntries(
        line.split(", ").map((field): [string, string] => {
          const [key, value] = field.split(": ");
          return [key, value];
        }),
      );

      const gender = Object.values(Gender).find((value) =>
        value === fields.Gender
      );

      if (gender === undefined) {
        throw new Error(`Unknown gender: ${fields.Gender}`);
      }

      const [x, y, z] = fields.Location.split(" ").map((axis) =>
        Number(axis.split("=")[1])
      );

      return {
        id: fields.PlayerID,
        name: fields.Name,
        gender,
        location: { x, y, z },
        speciesClass: fields.Class,
        growth: Number(fields.Growth),
        health: Number(fields.Health),
        stamina: Number(fields.Stamina),
        hunger: Number(fields.Hunger),
        thirst: Number(fields.Thirst),
        mutations: mutations(fields.MutationSlots),
        parentMutations: mutations(fields.ParentMutationSlots),
        elderMutationsA: mutations(fields.ElderMutationSlotsA),
        elderMutationsB: mutations(fields.ElderMutationSlotsB),
        primeElder: fields.PrimeElder === "true",
      };
    });
  }

  private static frame(header: readonly number[], text: string): Uint8Array {
    return Uint8Array.from([...header, ...new TextEncoder().encode(text)]);
  }

  private static withTimestamp(length: number): MessageEnd {
    return (text) =>
      text.length >= EvrimaRCON.TIMESTAMP.length + length
        ? text.length
        : EvrimaRCON.INCOMPLETE;
  }

  private send(opcode: Opcode, end: MessageEnd, args = ""): Promise<string> {
    const run = this.queue.then(async () => {
      if (!this.connected) throw new Error("Not connected");
      return await this.exchange(
        EvrimaRCON.frame([Packet.COMMAND, opcode], args),
        end,
      );
    });

    this.queue = run.then(() => undefined, () => this.close());

    return run;
  }

  private async exchange(frame: Uint8Array, end: MessageEnd): Promise<string> {
    const signal = AbortSignal.timeout(this.options.timeout);
    const chunks = on(this.socket, "data", { signal, close: ["close"] });
    const decoder = new TextDecoder();

    let reply = "";
    this.socket.write(frame);

    try {
      for await (const [chunk] of chunks) {
        reply += decoder.decode(chunk, { stream: true });
        const index = end(reply);
        if (index !== EvrimaRCON.INCOMPLETE) return reply.slice(0, index);
      }
    } catch (error) {
      if (!signal.aborted) throw error;
    }

    if (reply !== "" || !signal.aborted) {
      throw new Error("Reply did not complete");
    }

    return "";
  }
}
