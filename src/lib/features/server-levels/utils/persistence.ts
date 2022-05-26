import { Server } from '../../../common/servers';
import { Filesystem } from '../../filesystems';
import { LEVEL_DATA_FILENAME } from '../constants';
import { LevelData } from '../types';

export function loadLevelDataFromFs(
  fs: Filesystem,
  levelName: string
): LevelData {
  const data = fs.read(`${levelName}/${LEVEL_DATA_FILENAME}`);
  // TODO

  return data as unknown as LevelData;
}

export function loadLevelDataFromServer(server: Server): LevelData {
  return loadLevelDataFromFs(
    server.fs,
    server.props.get('level-name') || 'world'
  );
}
