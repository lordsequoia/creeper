import test from 'ava';
import { unlinkSync, writeFileSync } from 'fs-extra';

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

test('serialize', (t) => {
  const { serializeServerProperties } = useServerPropertiesFeatures();

  const props = new Map<string, string>() as ServerProps;
  props.set('hello', 'world');

  t.deepEqual(serializeServerProperties(props), 'hello=world');
});

test('deserialize', (t) => {
  const { deserialize } = useServerProps();

  const props = new Map<string, string>() as ServerProps;
  props.set('hello', 'world');

  t.deepEqual(deserialize('hello=world'), props);
});
