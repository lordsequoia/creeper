import useServerFs, { ServerFs } from './server-fs';
import useServerProps, { ServerProps } from './server-props';

export type Server = {
    readonly fs: ServerFs
    readonly props: ServerProps
};

export type ServerLoaderOptions = {
    readonly rootDir?: string;
}

export type UseServer = {
    readonly loadServer: (options?: ServerLoaderOptions) => Server;
}

export function useServer(): UseServer {
    function loadServer(options?: ServerLoaderOptions): Server {
        const { loadFromDisk } = useServerFs()
        const { loadFromFs } = useServerProps()

        const fs = loadFromDisk(options?.rootDir || '.')
        const props = loadFromFs(fs)

        return { fs, props }
    }

    return { loadServer }
}