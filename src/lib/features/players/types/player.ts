import { Server } from "../../core/server";

import { PlayerData, PlayerStats  } from ".";

export type Player = {
    readonly server: Server;
    readonly uuid: string;
    readonly name: string;
    readonly data: PlayerData;
    readonly stats: PlayerStats;
    readonly online: boolean;
}

export default Player