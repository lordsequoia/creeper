import { ServerLoaderOptions, useServer } from './lib/features/servers';

export * from './lib';

export const creep = (options?: ServerLoaderOptions) => useServer(options);

export default creep;
