/* eslint-disable functional/no-throw-statement */
import { Vec3 } from 'vec3'

import { Server } from '../server';

import { ItemSlot } from "./item"

export type PlayerData = {
    readonly Pos: Vec3;
    readonly EnderItems: readonly ItemSlot[]
    readonly Inventory: readonly ItemSlot[]
}

export function usePlayerData() {
    
    function getPlayerDataFile(server: Server, uuid: string): string {
        return `${server.props.get('level-name')}/playerdata/${uuid}.dat`
    }
    
    function loadPlayerData(server: Server, uuid: string): PlayerData {
        const dataFile = getPlayerDataFile(server, uuid)

        if (!server.fs.exists(dataFile)) throw new Error(`Player not found: ${uuid}`) 
        const rawData = server.fs.read(dataFile)

        // parse nbt

        return {} as PlayerData


    }

    return { getPlayerDataFile, loadPlayerData }
}