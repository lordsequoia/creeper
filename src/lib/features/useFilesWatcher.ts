import { Filesystem, FilesystemWatchCallback } from '../core';

import { useServerProperties } from '.';

export function useFilesWatcher(
  fs: Filesystem,
  callback: FilesystemWatchCallback
) {
  const props = useServerProperties(fs);
  const levelName = props.get('level-name') || 'world';

  return fs.watch(
    [
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
    ],
    callback
  );
}
