/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-throw-statement */
import { Filesystem } from '../core';

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

export function useServerPropertiesFeatures(): ServerPropertiesFeatures {
  function serializeServerProperties(value: ServerProperties) {
    const output = new Set<string>([]);

    value.forEach((value: string, key: string) => {
      output.add(`${key}=${value}`);
    });

    return Array.from(output).join('\n');
  }

  /**
   * TODO
   *
   * @param value
   * @returns
   */
  function deserializeServerProperties(value: string): ServerProperties {
    const map = new Map<string, string>([]);

    value
      .split('\n')
      .map((line: string) => line.trim().split('=', 2))
      .filter(([, value]) => value != undefined)
      .forEach(([key, value]) => {
        map.set(key, value);
      });

    return map as ServerProperties;
  }

  /**
   * TODO
   *
   * @param fs
   * @returns
   */
  function loadServerPropertiesFromFs(fs: Filesystem): ServerProperties {
    if (!fs.exists(SERVER_PROPS_FILENAME))
      throw new Error(`No server.properties file found.`);

    const properties = deserializeServerProperties(
      String(fs.read(SERVER_PROPS_FILENAME))
    );

    return properties;
  }

  /**
   * TODO
   *
   * @param properties
   * @param fs
   * @returns
   */
  function writeServerPropertiesToFs(
    properties: ServerProperties,
    fs: Filesystem
  ) {
    const data = serializeServerProperties(properties);

    fs.write(SERVER_PROPS_FILENAME, data);

    return;
  }

  return {
    serializeServerProperties,
    deserializeServerProperties,
    loadServerPropertiesFromFs,
    writeServerPropertiesToFs,
  };
}

export default useServerPropertiesFeatures;
