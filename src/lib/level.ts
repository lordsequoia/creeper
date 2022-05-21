import { Server } from "../server"

import { ServerLevelData } from "./level-data"

export type ServerLevel = {
    readonly name: string
    readonly data: ServerLevelData
}

export type UseServerLevel = {
    readonly loadFromServer: (server: Server) => ServerLevel
}

export function useServerLevel (): UseServerLevel {
    
    function loadFromServer(server: Server): ServerLevel {
        return server as unknown as ServerLevel
    }

    return { loadFromServer } as UseServerLevel
}

export default useServerLevel