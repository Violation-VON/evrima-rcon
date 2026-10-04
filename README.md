# evrima-rcon

[![Documentation](https://img.shields.io/badge/Documentation-blue)](https://violation-von.github.io/evrima-rcon)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github)](https://github.com/Violation-VON/evrima-rcon)
[![NPM](https://img.shields.io/npm/v/evrima-rcon.svg)](https://www.npmjs.com/package/evrima-rcon)
[![Downloads](https://img.shields.io/npm/d18m/evrima-rcon.svg)](https://www.npmjs.com/package/evrima-rcon)
[![Licence](https://img.shields.io/github/license/Violation-VON/evrima-rcon)](https://github.com/Violation-VON/evrima-rcon/blob/master/COPYING)
[![JSR Score](https://jsr.io/badges/@von/evrima-rcon/score)](https://jsr.io/@von/evrima-rcon)
[![CI](https://github.com/Violation-VON/evrima-rcon/actions/workflows/ci.yaml/badge.svg)](https://github.com/Violation-VON/evrima-rcon/actions/workflows/ci.yaml)

TypeScript RCON client for The Isle: Evrima.

[**Documentation — API Reference**](https://violation-von.github.io/evrima-rcon)

## Get Started

### Node.js

```sh
npm i evrima-rcon
```

```ts
import { EvrimaRCON } from "evrima-rcon";
```

### Deno

```sh
deno add jsr:@von/evrima-rcon
```

```ts
import { EvrimaRCON } from "@von/evrima-rcon";
```

## Usage

```ts
const rcon = new EvrimaRCON({
  host: "213.0.113.42",
  password: "●●●●●●●●●●●●",
});
await rcon.connect();

await rcon.announce("Hello world!");

rcon.close();
```

## Commands

The commands were tested against a v0.21.784 server.

| Command                           | Note                                                                                                                                                        | Support |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----: |
| Announce                          | [`announce(message: string): void`](https://violation-von.github.io/evrima-rcon/classes/EvrimaRCON.html#announce)                                           |   ✅    |
| Wipe Corpses                      | [`wipeCorpses(): void`](https://violation-von.github.io/evrima-rcon/classes/EvrimaRCON.html#wipecorpses)                                                    |   ✅    |
| Kick                              | [`kick(steamId: string, reason: string): boolean`](https://violation-von.github.io/evrima-rcon/classes/EvrimaRCON.html#kick)                                |   ✅    |
| Ban                               | [`ban(name: string, steamId: string, reason: string, duration?: number): boolean`](https://violation-von.github.io/evrima-rcon/classes/EvrimaRCON.html#ban) |   ✅    |
| List Players                      | [`listPlayers(): Player[]`](https://violation-von.github.io/evrima-rcon/classes/EvrimaRCON.html#listplayers)                                                |   ✅    |
| List Player Data                  | [`listPlayerData(): Character[]`](https://violation-von.github.io/evrima-rcon/classes/EvrimaRCON.html#listplayerdata)                                       |   ✅    |
| Direct Message                    | (broken in-game)                                                                                                                                            |   ❌    |
| Server Details                    |                                                                                                                                                             | Planned |
| Get Playables                     |                                                                                                                                                             | Planned |
| Update Playables                  |                                                                                                                                                             | Planned |
| Add Playable                      |                                                                                                                                                             | Planned |
| Remove Playable                   |                                                                                                                                                             | Planned |
| Toggle Migrations                 |                                                                                                                                                             | Planned |
| Toggle Growth Multiplier          |                                                                                                                                                             | Planned |
| Set Growth Multiplier             |                                                                                                                                                             | Planned |
| Toggle Net Update Distance Checks |                                                                                                                                                             | Planned |
| Save                              |                                                                                                                                                             | Planned |
| Pause                             |                                                                                                                                                             | Planned |
| Toggle Whitellist                 |                                                                                                                                                             | Planned |
| Add to Whitellist                 |                                                                                                                                                             | Planned |
| Remove from Whitellist            |                                                                                                                                                             | Planned |
| Toggle Global Chat                |                                                                                                                                                             | Planned |
| Toggle Humans                     |                                                                                                                                                             | Planned |
| Toggle AI                         |                                                                                                                                                             | Planned |
| Disable AI Species                |                                                                                                                                                             | Planned |
| Adjust AI Density                 |                                                                                                                                                             | Planned |
| Get Queue Status                  |                                                                                                                                                             | Planned |
| Toggle AI Learning                |                                                                                                                                                             | Planned |
| Command                           |                                                                                                                                                             | Unknown |

## Licence

Copyright © 2026 Violation.

This project is licensed under the terms of the
[GPL-3.0](https://github.com/Violation-VON/evrima-rcon/blob/main/COPYING)
licence.
