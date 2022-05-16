/* eslint-disable functional/no-let */
import zmq from 'zeromq'

import { Server } from '../server';
import { ServerFsWatchAborter, ServerFsWatchAction } from '../server-fs';

export const DEFAULT_PORT = 7001;
export const DEFAULT_HOST = '127.0.0.1';

export type ServerPublisherOptions = {
    readonly port?: number;
    readonly host?: string;
}

export type ServerPublication = {
    readonly type: string
    readonly data: any
}

export function useServerPublisher() {

    function createPublisher(server: Server, options?: ServerPublisherOptions) {
        const sock = zmq.socket('pub')

        const port = options?.port || DEFAULT_PORT
        const host = options?.host || DEFAULT_HOST

        const bindTo = `tcp://${host}:${port}`

        sock.bindSync(bindTo);
        console.log(`Publisher bound to ${bindTo}`);

        function publish (message: ServerPublication) {
            sock.send([message.type, JSON.stringify(message.data)])
        }

        let stopWatching: ServerFsWatchAborter | undefined = undefined

        const startWatching = () => {
            if(stopWatching) {
                stopWatching()
            }
            const levelName = server.props.get('level-name')

            stopWatching = server.fs.watch([
                `${levelName}/playerdata/*.*`,
                `${levelName}/stats/*.json`,
                `${levelName}/advancements/*.json`,
                `${levelName}/data/scoreboard.dat`,
                `logs/latest.log`,
                `eula.txt`,
                `whitelist.json`,
                `ops.json`,
                `usercache.json`,
                `banned-ips.json`,
                `banned-players.jsosn`,
                `server.properties`,
                `.creeper`,
            ], (action: ServerFsWatchAction) => {
                console.log('watch:', {action})

                publish({ type: 'fs-watch-action', data: action })
            })

            return { stopWatching }
        }

    
        return { sock, publish, startWatching }
    }

    return { createPublisher }
}

export default useServerPublisher