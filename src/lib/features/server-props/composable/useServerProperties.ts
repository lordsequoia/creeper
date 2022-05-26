import { createFilesystem, Filesystem } from '../../filesystems';
import { loadServerPropertiesFromFs } from '../utils';

export function useServerProperties(fs: Filesystem) {
  const loadProps = (_fs?: Filesystem) =>
    loadServerPropertiesFromFs(_fs || fs || createFilesystem('.'));

  const props = loadProps();

  return { props, loadProps };
}

export default useServerProperties;
