/* eslint-disable functional/no-throw-statement */
import { Filesystem } from '../filesystems';

import { WHITELIST_FILENAME } from './constants';
import { Whitelist } from './types';

/**
 * TODO
 *
 * @param value
 * @returns
 */
export function serializeWhitelist(value: Whitelist) {
  const data = Array.from(value);

  return JSON.stringify(data, null, 2);
}

export function deserializeWhitelist(value: string): Whitelist {
  const data = JSON.parse(value);

  return data as Whitelist;
}

export function loadWhitelistFromFs(fs: Filesystem): Whitelist {
  if (!fs.exists(WHITELIST_FILENAME))
    throw new Error(`File not found: ${WHITELIST_FILENAME}.`);

  const list = deserializeWhitelist(String(fs.read(WHITELIST_FILENAME)));

  return list;
}

export function writeWhitelistToFs(props: Whitelist, fs: Filesystem): void {
  const data = serializeWhitelist(props);

  fs.write(WHITELIST_FILENAME, data);

  return;
}
