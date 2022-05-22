/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable functional/no-throw-statement */
import { Server } from '../core';
import { Level } from '../shapes';

export type UseLevel = {
  readonly loadFromServer: (server: Server) => Level;
};

export function useLevel(_server: Server): UseLevel {
  throw new Error('Not implemented yet');
}

export default useLevel;
