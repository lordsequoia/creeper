import { Server } from "../core"
import { Player } from "../shapes"

import { usePlayerData, usePlayerStats } from "."

export function usePlayer(server: Server, uuid: string): Player {
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

export default usePlayer