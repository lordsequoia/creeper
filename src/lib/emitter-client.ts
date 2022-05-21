/* eslint-disable functional/no-mixed-type */
/* eslint-disable functional/no-return-void */
import zmq from 'zeromq'

import { DEFAULT_HOST, DEFAULT_PORT, Emission } from './emitter';

export type EmitterClientOptions = {
    readonly port?: number;
    readonly host?: string;
}

export type OnEmissionCallback = (emission: Emission) => void

export type EmitterClient = {
    readonly options: EmitterClientOptions;
    readonly subscribeTo: (to: string, callback: OnEmissionCallback) => void
}

export type EmitterClientFactory = {
    readonly createClient: (options?: EmitterClientOptions) => EmitterClient;
}

export function useEmitterClient(): EmitterClientFactory {

    function createClient(options?: EmitterClientOptions): EmitterClient {
        const sock = zmq.socket('sub')

        const port = options?.port || DEFAULT_PORT
        const host = options?.host || DEFAULT_HOST

        const connectTo = `tcp://${host}:${port}`

        sock.connect(connectTo);
        console.log(`Subscriber connected to ${connectTo}`);

        function subscribeTo(to: string, callback: ((publication: Emission) => void)) {
            sock.subscribe(to)
            
            sock.on('message', (topic: string, message: string) => 
                callback({ type: topic, data: JSON.parse(message) }))
        }

        return { subscribeTo, options: { port, host }}
    }

    return { createClient }
}

export default useEmitterClient