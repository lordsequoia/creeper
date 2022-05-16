/* eslint-disable functional/no-return-void */
import zmq from 'zeromq'

import { DEFAULT_HOST, DEFAULT_PORT, ServerPublication } from './publisher';

export type ServerSubscriberOptions = {
    readonly port?: number;
    readonly host?: string;
}

export function useServerSubscriber() {

    function createSubscriber(options?: ServerSubscriberOptions) {
        const sock = zmq.socket('sub')

        const port = options?.port || DEFAULT_PORT
        const host = options?.host || DEFAULT_HOST

        const connectTo = `tcp://${host}:${port}`

        sock.connect(connectTo);
        console.log(`Subscriber connected to ${connectTo}`);

        function startListening(to: string, callback: (publication: ServerPublication) => void) {
            console.log(`Starting to listen...`)

            sock.subscribe(to)

            sock.on('message', (topic: string, message: string) => {
                console.log(` < | ${topic}: ${message}`)
                callback({ type: topic, data: JSON.parse(message) })
            })
        }

        return { sock, startListening }
    }

    return { createSubscriber }
}

export default useServerSubscriber