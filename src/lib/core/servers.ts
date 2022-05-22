/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-mixed-type */

import { ProducerSendFunction, ServerProps } from '../';

/**
 * Contains the filename for the server properties file.
 */
export const SERVER_PROPS_FILENAME = 'server.properties';

/**
 * TODO
 */
export type ServerProps = ReadonlyMap<string, string>;

/**
 * TODO
 */
export type Server = {
  readonly fs: Filesystem;
  readonly levelName: () => string;
  readonly log: LogFunction;
  readonly send: ProducerSendFunction;
  readonly props: ServerProps;
  readonly unload: () => void;
};
