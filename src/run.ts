#!/usr/bin/env node

import creep, { createSubscriber, FilesystemMessage, Message } from './index';

function main() {
  const server = creep({
    rootDir: '/Volumes/HOME/server',
    emitFs: true,
  });

  console.log(`Server is: ${typeof server}`);

  const { subscribeTo } = createSubscriber({
    host: '127.0.0.1',
    port: 7001,
  });

  subscribeTo('fs', (message: Message) => {
    const msg = message.data as FilesystemMessage;

    console.log(`YO! ${msg.event} on: ${msg.file}`);
  });
}

export default main();
