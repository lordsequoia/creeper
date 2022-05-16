/* eslint-disable functional/no-throw-statement */import { Vec3 } from 'vec3'

import { Server } from '../server';

export type PlayerStats = ReadonlyMap<string, string>

export function usePlayerStats() {
    
    function getPlayerStatsFile(server: Server, uuid: string): string {
        return `${server.props.get('level-name')}/stats/${uuid}.json`
    }
    
    function loadPlayerStats(server: Server, uuid: string): PlayerStats {
        const statsFile = getPlayerStatsFile(server, uuid)

        if (!server.fs.exists(statsFile)) throw new Error(`Player stats not found: ${uuid}`) 
        
        const rawData = server.fs.read(statsFile)
        // parse nbt

        return {} as PlayerStats


    }

    return { getPlayerStatsFile, loadPlayerStats }
}