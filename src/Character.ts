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
import type { Coordinates } from "./Coordinates.ts";
import { Gender } from "./Gender.ts";
import type { Player } from "./Player.ts";

/**
 * Player character state.
 */
export interface Character extends Player {
  /**
   * Gender.
   */
  gender: Gender;

  /**
   * Location.
   */
  location: Coordinates;

  /**
   * Species.
   */
  speciesClass: string;

  /**
   * Growth percentage from 0 to 1.
   */
  growth: number;

  /**
   * Health percentage from 0 to 1.
   */
  health: number;

  /**
   * Stamina percentage from 0 to 1.
   */
  stamina: number;

  /**
   * Hunger percentage from 0 to 1.
   */
  hunger: number;

  /**
   * Thirst percentage from 0 to 1.
   */
  thirst: number;

  /**
   * Standard mutations.
   */
  mutations: [string | null, string | null, string | null, string | null];

  /**
   * Parent or first generation mutations.
   */
  parentMutations: [string | null, string | null, string | null, string | null];

  /**
   * Second generation mutations.
   */
  elderMutationsA: [string | null, string | null, string | null, string | null];

  /**
   * Third generation mutations.
   */
  elderMutationsB: [string | null, string | null, string | null, string | null];

  /**
   * Whether currently prime.
   */
  primeElder: boolean;
}
