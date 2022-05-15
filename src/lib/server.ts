import useServerFs, { ServerFs } from './server-fs';
import useServerProps, { ServerProps } from './server-props';

/**
 * TODO
 */
export type Server = {
  readonly fs: ServerFs;
  readonly props: ServerProps;
};

/**
 * TODO
 */
export type ServerLoaderOptions = {
  readonly rootDir?: string;
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

    const fs = loadFromDisk(options?.rootDir || '.');
    const props = loadFromFs(fs);

    return { fs, props };
  }

  return { loadServer };
}

export default useServer;
