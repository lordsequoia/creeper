/* eslint-disable functional/no-mixed-type */
/* eslint-disable functional/no-return-void */
/* eslint-disable @typescript-eslint/no-explicit-any */
import zmq from 'zeromq';

import { useLogger } from '../common';

const DEFAULT_PORT = 7001;
const DEFAULT_HOST = '127.0.0.1';

export type ProducerOptions = {
  readonly port?: number;
  readonly host?: string;
};

export type Message = {
  readonly type: string;
  readonly data: any;
};

export type ProducerSendFunction = (message: Message) => void;

export type Producer = {
  readonly send: ProducerSendFunction;
};

export type SubscriberOptions = {
  readonly port?: number;
  readonly host?: string;
};

export type OnMessage = (Message: Message) => void;

export type Subscriber = {
  readonly options: SubscriberOptions;
  readonly subscribeTo: (to: string, callback: OnMessage) => void;
};

export function createSubscriber(options?: SubscriberOptions): Subscriber {
  const sock = zmq.socket('sub');

  const port = options?.port || DEFAULT_PORT;
  const host = options?.host || DEFAULT_HOST;

  const connectTo = `tcp://${host}:${port}`;

  sock.connect(connectTo);
  useLogger().info(`Subscriber connected to ${connectTo}`);

  function subscribeTo(to: string, callback: OnMessage) {
    sock.subscribe(to);

    sock.on('message', (topic: string, message: string) =>
      callback({ type: topic, data: JSON.parse(message) })
    );
  }

  return { subscribeTo, options: { port, host } };
}

export function createProducer(options?: ProducerOptions): Producer {
  const sock = zmq.socket('pub');

  const port = options?.port || DEFAULT_PORT;
  const host = options?.host || DEFAULT_HOST;

  const bindTo = `tcp://${host}:${port}`;

  const binding = sock.bindSync(bindTo);

  useLogger().info(`Publisher bound to ${bindTo}`);

  function send(emission: Message) {
    const { type, data } = emission;
    const serializedData = JSON.stringify(data);

    binding.send([type, serializedData]);
  }

  return { send };
}
