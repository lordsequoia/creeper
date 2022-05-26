import { Filesystem } from '../../filesystems';
import { loadWhitelistFromFs } from '../utils';
/**
 * TODO
 *
 * @returns
 */
export function useWhitelist(fs: Filesystem) {
  const loadWhitelist = () => loadWhitelistFromFs(fs);

  const whitelist = loadWhitelist;

  return { whitelist, loadWhitelist };
}

export default useWhitelist;
