/**
 * TODO
 */
export type FilesystemMessage = {
  readonly file: string;
  readonly event: string;
};

/**
 * TODO
 */
export type FilesystemEventType = 'CREATE' | 'UPDATE' | 'DELETE';

/**
 * TODO
 */
export type FilesystemEvent = {
  readonly file: string;
  readonly event: FilesystemEventType;
  readonly stats?: Stats;
};

/**
 * TODO
 */
export type FilesystemWatchAborter = () => void;

export type FilesystemWatcher = {
  readonly isReady: () => boolean;
  readonly listWatchedFiles: () => ReadonlySet<string>;
  readonly stopWatching: () => void;
};

/**
 * TODO
 */
export type FilesystemWatchCallback = (event: FilesystemEvent) => void;
export type FilesystemSearchCallback = (files: readonly string[]) => void;

/**
 * Describes the behavior and features of a filesystem.
 */
export type Filesystem = {
  readonly exists: (path: string) => boolean;
  readonly read: (path: string) => Buffer;
  readonly write: (path: string, contents: string | Buffer) => void;
  readonly list: (path: string) => readonly string[];
  readonly filepath: (path: string, reverse?: boolean) => string;
  readonly search: (
    pattern: string,
    callback: FilesystemSearchCallback
  ) => void;
  readonly watch: (
    paths: readonly string[],
    callback: FilesystemWatchCallback
  ) => FilesystemWatcher;
};
