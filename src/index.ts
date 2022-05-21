import { ServerLoaderOptions, useServer } from './lib/server';

export * from './lib/config'
export * from './lib/server';
export * from './lib/server-fs';
export * from './lib/server-props';
export * from './lib/emitter'
export * from './lib/emitter-client'
export * from './lib/server-files'
export * from './lib/player'
export * from './lib/player-data'
export * from './lib/player-stats'
export * from './lib/item'
export * from './lib/level'
export * from './lib/level-data'

export const creeper = (options?: ServerLoaderOptions) => useServer().loadServer(options)

export default creeper