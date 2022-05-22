import { Subscriber } from '../core/pubsub';
/* eslint-disable functional/no-return-void */
export type PlayerStatsTrackerFeature = {};

export type OnGainCallback = (gain: Gain) => void;

export function usePlayerStatsTracker(
  subscriber: Subscriber
): PlayerStatsTrackerFeature {
  const stats = new Map<string, readonly Stat[]>();

  function onGain(callback: OnGainCallback): void {
    return;
  }

  return { stats, onGain };
}

export default usePlayerStatsTracker;
