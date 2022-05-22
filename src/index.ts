import { ServerLoaderOptions, useServer } from './lib';

export * from './lib';

export const creep = (options?: ServerLoaderOptions) => useServer(options);

export default creep;
