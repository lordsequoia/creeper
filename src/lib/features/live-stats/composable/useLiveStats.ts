/* eslint-disable functional/no-return-void */

import { FilesystemMessage } from '../../filesystems';
import { Message, Subscriber } from '../../pubsub';
import { Stat } from '../../statistics';
import { STATS_FILE_REGEX } from '../constants';
import { OnGainCallback } from '../types';

export function useLiveStats(subscriber: Subscriber) {
  const stats = new Map<string, readonly Stat[]>();

  function onGain(callback: OnGainCallback): void {
    return subscriber.subscribeTo('fs', (message: Message) => {
      const msg = message.data as FilesystemMessage;
      const matches = msg.file.match(STATS_FILE_REGEX);

      if (matches?.length) {
        // TODO: do something with callback and microdiff
        callback({});
      }

      return;
    });
  }

  return { stats, onGain };
}

export default useLiveStats;
