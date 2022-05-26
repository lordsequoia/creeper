import { createFilesystem, Filesystem } from '..';

/**
 * Bootstrap a Minecraft server filesystem by loading a directory from disk.
 *
 * @param rootDir The directory that contains your server.properties file
 * @returns
 */
export const useFilesystem = (rootDir?: string): Filesystem =>
  createFilesystem(rootDir);

export default useFilesystem;
