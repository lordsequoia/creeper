import { ServerFs, ServerFsWatchCallback, useServerProps } from ".."

export function useServerFiles () {

    function startWatching(fs: ServerFs, callback: ServerFsWatchCallback) {
        const { loadFromFs } = useServerProps()

        const props = loadFromFs(fs)
        const levelName = props.get('level-name') || 'world'


        return fs.watch([
            `${levelName}/playerdata/*.*`,
            `${levelName}/stats/*.json`,
            `${levelName}/advancements/*.json`,
            `${levelName}/data/scoreboard.dat`,
            `${levelName}/level.dat`,
            `logs/latest.log`,
            `eula.txt`,
            `whitelist.json`,
            `ops.json`,
            `usercache.json`,
            `banned-ips.json`,
            `banned-players.json`,
            `server.properties`,
            `.creeper`,
        ], callback)
    }

    return { startWatching }
}

export default useServerFiles