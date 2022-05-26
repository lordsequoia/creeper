/* eslint-disable functional/no-return-void */
import { Filesystem } from '../filesystems';

export type ServerProperties = ReadonlyMap<string, string>;

/**
 * TODO
 */
export type ServerPropertiesFeatures = {
  readonly serializeServerProperties: (value: ServerProperties) => string;
  readonly deserializeServerProperties: (value: string) => ServerProperties;
  readonly loadServerPropertiesFromFs: (fs: Filesystem) => ServerProperties;
  readonly writeServerPropertiesToFs: (
    properties: ServerProperties,
    fs: Filesystem
  ) => void;
};
