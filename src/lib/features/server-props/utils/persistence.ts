/* eslint-disable functional/no-throw-statement */
import { Filesystem } from '../../filesystems';
import { SERVER_PROPS_FILENAME } from '../constants';
import { ServerProperties } from '../types';

import {
  deserializeServerProperties,
  serializeServerProperties,
} from './serializer';

/**
 * TODO
 *
 * @param fs
 * @returns
 */
export function loadServerPropertiesFromFs(fs: Filesystem): ServerProperties {
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
export function writeServerPropertiesToFs(
  properties: ServerProperties,
  fs: Filesystem
) {
  const data = serializeServerProperties(properties);

  fs.write(SERVER_PROPS_FILENAME, data);

  return;
}
