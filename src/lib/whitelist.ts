/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/prefer-readonly-type */
import { ServerFs } from './server-fs';

/**
 * Contains the filename for the whitelist file.
 */
export const WHITELIST_FILENAME = 'whitelist.json';

/**
 * TODO
 */
export type Whitelist = Map<string, string>;

/**
 * TODO
 */
export type UseWhitelist = {
  serialize: (value: Whitelist) => string;
  deserialize: (value: string) => Whitelist;
  loadFromFs: (fs: ServerFs) => Whitelist;
  writeToFs: (props: Whitelist, fs: ServerFs) => void;
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
    const data = Array.from(value)

    return JSON.stringify(data, null, 2);
  }

  function deserialize(value: string): Whitelist {
    const data = JSON.parse(value)

    return data as Whitelist;
  }

  function loadFromFs(fs: ServerFs): Whitelist {
    if (!fs.exists(WHITELIST_FILENAME))
      throw new Error(`No server.properties file found.`);

    const list = deserialize(String(fs.read(WHITELIST_FILENAME)));

    return list;
  }

  function writeToFs(props: Whitelist, fs: ServerFs): void {
    const data = serialize(props);

    fs.write(WHITELIST_FILENAME, data);

    return;
  }

  return { serialize, deserialize, loadFromFs, writeToFs };
}

export default useWhitelist;
