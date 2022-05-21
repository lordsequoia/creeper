/* eslint-disable functional/no-throw-statement */
import { Vec3 } from 'vec3'

import { ItemSlot } from "./item"
import { Server } from './server';


export type PlayerData = {
    readonly Score: number
    readonly Pos: Vec3;
    readonly EnderItems: readonly ItemSlot[]
    readonly Inventory: readonly ItemSlot[]
    readonly SpawnX: number
    readonly SpawnY: number
    readonly SpawnZ: number
}

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