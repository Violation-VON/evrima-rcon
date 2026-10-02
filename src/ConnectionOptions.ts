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
