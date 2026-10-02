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
 * Connection options of an {@link EvrimaRCON} client.
 */
export interface ConnectionOptions {
  /**
   * Hostname or IP address of the server.
   */
  host: string;

  /**
   * RCON port; defaults to {@link EvrimaRCON.DEFAULT_PORT}.
   */
  port?: number;

  /**
   * RCON password.
   */
  password: string;

  /**
   * Reply timeout in milliseconds; defaults to {@link EvrimaRCON.DEFAULT_TIMEOUT}.
   */
  timeout?: number;
}
