/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable functional/no-return-void */
import zmq from 'zeromq'

import { useLogger } from './logger';

export const DEFAULT_PORT = 7001;
export const DEFAULT_HOST = '127.0.0.1';

export type EmitterOptions = {
    readonly port?: number;
    readonly host?: string;
}

export type Emission = {
    readonly type: string
    readonly data: any
}

export type EmitFunction = (emission: Emission) => void

export type Emitter = {
    readonly emit: (emission: Emission) => void
}

export type UseEmitter = { 
    readonly createEmitter: (options?: EmitterOptions) =>  Emitter
}

export function useEmitter(): UseEmitter {

    function createEmitter(options?: EmitterOptions): Emitter {
        const sock = zmq.socket('pub')

        const port = options?.port || DEFAULT_PORT
        const host = options?.host || DEFAULT_HOST

        const bindTo = `tcp://${host}:${port}`

        const binding = sock.bindSync(bindTo);
        
        useLogger().info(`Publisher bound to ${bindTo}`)

        function emit (emission: Emission) {
            const { type, data } = emission
            const serializedData = JSON.stringify(data)

            binding.send([type, serializedData])
        }

        return { emit }
    }
    

    return { createEmitter }
}

export default useEmitter