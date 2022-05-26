/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable functional/no-return-void */
import usePubSub from '../../pubsub/composable/usePubSub';
import { Message, SubscriberOptions } from '../../pubsub/utils';
import { OnFileUpdate, OnGain, ServerEventName, ServerWatcher } from '../types';

export function useServerEvents(options?: SubscriberOptions): ServerWatcher {
  const { createSubscriber } = usePubSub();

  const subscriber = createSubscriber();

  const listeners = new Map<ServerEventName, readonly (() => void)[]>();

  subscriber.subscribeTo('*', (message: Message) => {
    listeners.get(message.type)?.forEach((callback: () => void) => {
      callback();
    });
  });

  function onGain(callback: OnGain) {
    listeners.get('gain')?.push(() => callback({}));
    return;
  }

  function onFileUpdate(callback: OnFileUpdate) {
    return;
  }

  return { onGain, onFileUpdate };
}

export default useServerEvents;
