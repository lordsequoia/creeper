/* eslint-disable functional/no-return-void */
import { useLogger } from '../common';
import { FilesystemEvent, Server } from '../core';

import {
  useFilesWatcher,
  useFilesystem,
  usePubSub,
  useServerProperties,
} from './';
/**
 * TODO
 */
export type ServerLoaderOptions = {
  readonly rootDir?: string;
  readonly emitFs?: boolean;
};

/**
 * TODO
 *
 * @param options
 * @returns
 */
export function useServer(options?: ServerLoaderOptions): Server {
  const { info, log } = useLogger();

  const { createProducer } = usePubSub();
  const { send } = createProducer();
  const fs = useFilesystem(options?.rootDir || '.');
  const props = useServerProperties(fs);

  const levelName = () => props.get('level-name') || 'world';

  const unloaders = new Set<() => void>();

  if (options?.emitFs === true) {
    info(`Filesystem events emissions are enabled`);

    const { stopWatching } = useFilesWatcher(fs, (event: FilesystemEvent) => {
      send({ type: 'fs', data: event });
    });

    unloaders.add(() => {
      info(`Unloading filesystem event emissions`);
      stopWatching();
    });
  }

  const unload = () => unloaders.forEach((unloader) => unloader());

  return { fs, log, props, levelName, send, unload };
}

export default useServer;
