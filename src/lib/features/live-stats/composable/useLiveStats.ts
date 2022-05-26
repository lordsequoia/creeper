/* eslint-disable functional/no-return-void */
import { Message, Subscriber } from '../core/pubsub';
import { FilesystemMessage } from '../core/filesystems';
export type PlayerStatsTrackerFeature = {};

type Gain = any;
type Stat = any;

export type OnGainCallback = (gain: Gain) => void;

export const STATS_FILE_REGEX = /[A-Z]/g;

export function useLiveStats(
  subscriber: Subscriber
): PlayerStatsTrackerFeature {
  const stats = new Map<string, readonly Stat[]>();

  function onGain(callback: OnGainCallback): void {
    return subscriber.subscribeTo('fs', (message: Message) => {
      const msg = message.data as FilesystemMessage;
      const matches = msg.file.match(STATS_FILE_REGEX);

      if (matches?.length) {
        // TODO: do something with callback and microdiff
      }

      return;
    });
  }

  return { stats, onGain };
}

export default useLiveStats;
