import { Coordinates } from "./Coordinates.ts";
import { Gender } from "./Gender.ts";
import { Player } from "./Player.ts";

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
