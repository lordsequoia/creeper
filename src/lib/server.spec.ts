import test from 'ava';
import { unlinkSync, writeFileSync } from 'fs-extra';

import useServer from './server';

test('loadServer', (t) => {
  writeFileSync('.creeper', 'SERVER_DIR=.');
  writeFileSync('server.properties', 'foo=bar\nhello=world');

  const { loadServer } = useServer();
  const { props } = loadServer({ rootDir: '.' });

  unlinkSync('./.creeper');
  unlinkSync('./server.properties');

  t.is(props.get('foo'), 'bar');
  t.is(props.get('hello'), 'world');
});
