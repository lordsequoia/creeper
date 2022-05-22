import { Filesystem } from '../core';

import useServerPropsFeatures from './useServerPropertiesFeatures';

export function useServerProperties(fs: Filesystem): ServerPropertiesFeature {
  const { loadServerPropsFromFs } = useServerPropsFeatures();

  return loadServerPropsFromFs(fs);
}

export default useServerProperties;
