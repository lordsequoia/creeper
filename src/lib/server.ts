/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-mixed-type */
import useEmitter, { EmitFunction } from './emitter';
import useLogger, { LogFunction } from './logger';
import useServerFiles from './server-files';
import useServerFs, { ServerFs, ServerFsWatchAction } from './server-fs';
import useServerProps, { ServerProps } from './server-props';

/**
 * TODO
 */
export type Server = {
  readonly fs: ServerFs;
  readonly levelName: () => string;
  readonly log: LogFunction;
  readonly emit: EmitFunction;
  readonly props: ServerProps;
  readonly unload: () => void;
};

/**
 * TODO
 */
export type ServerLoaderOptions = {
  readonly rootDir?: string;
  readonly emitFs?: boolean;
};

/**
 * TODO
 */
export type UseServer = {
  readonly loadServer: (options?: ServerLoaderOptions) => Server;
};

/**
 * TODO
 *
 * @returns
 */
export function useServer(): UseServer {
  /**
   * TODO
   *
   * @param options
   * @returns
   */
  function loadServer(options?: ServerLoaderOptions): Server {
    const { loadFromDisk } = useServerFs();
    const { loadFromFs } = useServerProps();
    const { createEmitter } = useEmitter();
    const { info, log } = useLogger()

    const { emit } = createEmitter()
    const fs = loadFromDisk(options?.rootDir || '.');
    const props = loadFromFs(fs);
    
    const levelName = () => props.get('level-name') || 'world'

    const { startWatching } = useServerFiles()

    const unloaders = new Set<() => void>()

    if (options?.emitFs === true) {
      info(`Filesystem events emissions are enabled`)

      const { stopWatching } = startWatching(fs, (action: ServerFsWatchAction) => emit({ type: 'fs', data: action }))
      unloaders.add(() => {
        info(`Unloading filesystem event emissions`)
        stopWatching()
      })
    }

    const unload = () => unloaders.forEach((unloader) => unloader())

    return { fs, log, props, levelName, emit, unload };
  }

  return { loadServer };
}

export default useServer;
