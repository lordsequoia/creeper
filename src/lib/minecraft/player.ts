import { PlayerData, usePlayerData } from "./player-data"
import { PlayerStats, usePlayerStats } from "./player-stats";

import { Server } from "../server";

export type Player = {
    readonly server: Server;
    readonly uuid: string;
    readonly name: string;
    readonly data: PlayerData;
    readonly stats: PlayerStats;
    readonly online: boolean;
}

export function usePlayer() {
    
    function loadPlayer(server: Server, uuid: string): Player {
        const { loadPlayerData } = usePlayerData()
        const { loadPlayerStats } = usePlayerStats()

        const data = loadPlayerData(server, uuid)
        const stats = loadPlayerStats(server, uuid)

        const player = Object.assign({
            server,
            uuid,
            data,
            stats,
            online: false,
        }, {}) as Player

        return player
    }

    return { loadPlayer }
}

export default usePlayer