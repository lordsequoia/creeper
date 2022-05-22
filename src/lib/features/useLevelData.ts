import { parse, stringify } from 'nbt-ts';

import { Filesystem, Server } from '../core';
import { LEVEL_DATA_FILENAME, LevelData } from '../shapes';

export type UseLevelData = {
  readonly serialize: (value: LevelData) => Promise<Buffer>;
  readonly deserialize: (value: Buffer) => Promise<LevelData>;
  readonly loadFromFs: (fs: Filesystem, levelName: string) => LevelData;
  readonly loadFromServer: (server: Server) => LevelData;
};

export function useLevelData(): UseLevelData {
  async function deserialize(value: Buffer): Promise<LevelData> {
    const data = await parse(String(value));

    return data as LevelData;
  }

  async function serialize(value: LevelData): Promise<Buffer | string> {
    const data = await stringify(value);

    return data;
  }

  function loadFromFs(fs: Filesystem, levelName: string): LevelData {
    const data = fs.read(`${levelName}/${LEVEL_DATA_FILENAME}`);
    // TODO

    return data as unknown as LevelData;
  }

  function loadFromServer(server: Server): LevelData {
    return loadFromFs(server.fs, server.props.get('level-name') || 'world');
  }

  return { serialize, deserialize, loadFromFs, loadFromServer } as UseLevelData;
}

export default useLevelData;
