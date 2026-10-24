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

/**
 * Details of a server.
 */
export interface ServerDetails {
  /**
   * Name.
   */
  name: string;

  /**
   * Map.
   */
  map: string;

  /**
   * Maximum number of players.
   */
  maxPlayers: number;

  /**
   * Current number of players.
   */
  currentPlayers: number;

  /**
   * Whether mutations are enabled.
   */
  mutationsEnabled: boolean;

  /**
   * Whether humans are enabled.
   */
  humansEnabled: boolean;

  /**
   * Password.
   */
  password: string;

  /**
   * Whether the password is enabled.
   */
  passwordEnabled: boolean;

  /**
   * Whether the queue is enabled.
   */
  queueEnabled: boolean;

  /**
   * Whether the whitelist is enabled.
   */
  whitelistEnabled: boolean;

  /**
   * Whether AI spawning is enabled.
   */
  aiSpawnEnabled: boolean;

  /**
   * Whether recording replays is allowed.
   */
  recordingReplayAllowed: boolean;

  /**
   * Whether region spawning is enabled.
   */
  regionSpawningEnabled: boolean;

  /**
   * Whether the region spawn cooldown is enabled.
   */
  regionSpawnCooldownEnabled: boolean;

  /**
   * Region spawn cooldown in seconds.
   */
  regionSpawnCooldownSeconds: number;

  /**
   * Day length in minutes.
   */
  dayLengthMinutes: number;

  /**
   * Night length in minutes.
   */
  nightLengthMinutes: number;

  /**
   * Whether global chat is enabled.
   */
  globalChatEnabled: boolean;
}
