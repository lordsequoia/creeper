/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-return-void */
import { Filesystem } from '../core';

/**
 * TODO
 *
 * @returns
 */
export function useWhitelist(): UseWhitelist {
  return { serialize, deserialize, loadFromFs, writeToFs };
}

export default useWhitelist;
