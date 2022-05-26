/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-mixed-type */

import { Filesystem, ProducerSendFunction } from '..';
import { LogFunction } from '../../common';
import { ServerProperties } from '../server-props';

/**
 * TODO
 */
export type Server = {
  readonly fs: Filesystem;
  readonly levelName: () => string;
  readonly log: LogFunction;
  readonly send: ProducerSendFunction;
  readonly props: ServerProperties;
  readonly unload: () => void;
};

/**
 * TODO
 */
export type ServerLoaderOptions = {
  readonly rootDir?: string;
  readonly emitFs?: boolean;
};
