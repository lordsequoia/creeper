import { createProducer, createSubscriber } from '../core';

export function usePubSub() {
  return { createProducer, createSubscriber };
}

export default usePubSub;
