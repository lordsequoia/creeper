/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-return-void */
import { Filesystem } from '../core';

/**
 * Contains the filename for the whitelist file.
 */
export const WHITELIST_FILENAME = 'whitelist.json';

/**
 * TODO
 */
export type Whitelist = ReadonlyMap<string, string>;

/**
 * TODO
 */
export type UseWhitelist = {
  readonly serialize: (value: Whitelist) => string;
  readonly deserialize: (value: string) => Whitelist;
  readonly loadFromFs: (fs: Filesystem) => Whitelist;
  readonly writeToFs: (props: Whitelist, fs: Filesystem) => void;
};

/**
 * TODO
 *
 * @returns
 */
export function useWhitelist(): UseWhitelist {
  /**
   * TODO
   *
   * @param value
   * @returns
   */
  function serialize(value: Whitelist) {
    const data = Array.from(value);

    return JSON.stringify(data, null, 2);
  }

  function deserialize(value: string): Whitelist {
    const data = JSON.parse(value);

    return data as Whitelist;
  }

  function loadFromFs(fs: Filesystem): Whitelist {
    if (!fs.exists(WHITELIST_FILENAME))
      throw new Error(`File not found: ${WHITELIST_FILENAME}.`);

    const list = deserialize(String(fs.read(WHITELIST_FILENAME)));

    return list;
  }

  function writeToFs(props: Whitelist, fs: Filesystem): void {
    const data = serialize(props);

    fs.write(WHITELIST_FILENAME, data);

    return;
  }

  return { serialize, deserialize, loadFromFs, writeToFs };
}

export default useWhitelist;
