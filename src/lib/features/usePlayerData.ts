/* eslint-disable functional/no-throw-statement */
import { Server } from "../core"
import { PlayerData } from "../shapes"

export function usePlayerData() {
    
    function getPlayerDataFile(server: Server, uuid: string): string {
        return `${server.props.get('level-name')}/playerdata/${uuid}.dat`
    }

    function loadPlayerData(server: Server, uuid: string): PlayerData {
        const dataFile = getPlayerDataFile(server, uuid)

        if (!server.fs.exists(dataFile)) throw new Error(`Player not found: ${uuid}`) 
        const rawData = server.fs.read(dataFile)
        console.log(`loadPlayerData: ${rawData}`, { dataFile, rawData})

        // parse nbt

        return {} as PlayerData


    }

    return { getPlayerDataFile, loadPlayerData }
}