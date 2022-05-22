/* eslint-disable functional/immutable-data */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable functional/no-return-void */
import { FilesystemEventType, Message, Server } from '../core';
import { SubscriberOptions } from '../core/pubsub/subscriber';
import usePubSub from './usePubSub';

export type MesssageType = '*' | 'fs' | string;
export type ServerEventName = 'gain' | 'file-update' | string;

export type Gain = {};
export type OnGain = (gain: Gain) => void;

export type File = {};
export type OnFileUpdate = (type: FilesystemEventType, file: File) => void;

export type ServerWatcher = {
  readonly onGain: (callback: OnGain) => void;

  readonly onFileUpdate: (callback: OnFileUpdate) => void;
};

export function useServerEvents(options?: SubscriberOptions): ServerWatcher {
  const { createSubscriber } = usePubSub();

  const subscriber = createSubscriber();

  const listeners = new Map<ServerEventName, (() => void)[]>();

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
