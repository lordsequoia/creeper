import { Server } from '../../../common/servers';
import { Filesystem } from '../../server-files';

import LevelData from './data';
import Level from './level';

export type UseLevel = {
  readonly loadFromServer: (server: Server) => Level;
};

export type UseLevelData = {
  readonly serialize: (value: LevelData) => Promise<Buffer>;
  readonly deserialize: (value: Buffer) => Promise<LevelData>;
  readonly loadFromFs: (fs: Filesystem, levelName: string) => LevelData;
  readonly loadFromServer: (server: Server) => LevelData;
};
