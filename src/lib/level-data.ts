import { parse, stringify } from 'nbt-ts'

import { Server } from './server';
import { ServerFs } from './server-fs';

export const SERVER_LEVEL_DATA_FILENAME = 'level.dat'

export type ServerLevelData = {
    readonly name: string
}

export type UseServerLevelData = {
     readonly serialize: (value: ServerLevelData) => Promise<Buffer>
     readonly deserialize: (value: Buffer) => Promise<ServerLevelData>
     readonly loadFromFs: (fs: ServerFs, levelName: string) => ServerLevelData
     readonly loadFromServer: (server: Server) => ServerLevelData
}

export function useServerLevelData(): UseServerLevelData {

    async function deserialize (value: Buffer): Promise<ServerLevelData> {
        const data = await parse(String(value))

        return data as ServerLevelData
    }

    async function serialize (value: ServerLevelData): Promise<Buffer | string> {
        const data = await stringify(value)

        return data
    }

    function loadFromFs(fs: ServerFs, levelName: string): ServerLevelData {
        const data = fs.read(`${levelName}/${SERVER_LEVEL_DATA_FILENAME}`)
        // TODO

        return data as unknown as ServerLevelData
    }

    function loadFromServer(server: Server): ServerLevelData {
        return loadFromFs(server.fs, server.props.get('level-name') || 'world')
    }

    return { serialize, deserialize, loadFromFs, loadFromServer } as UseServerLevelData
}

export default useServerLevelData