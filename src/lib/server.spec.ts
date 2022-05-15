import test from 'ava';
import { mkdir, unlinkSync, writeFileSync } from 'fs-extra';

import useServer from './server';

test('loadServer', (t) => {
    mkdir('./tmp')
    writeFileSync('./tmp/.creeper', 'SERVER_DIR=.')
    writeFileSync('./tmp/server.properties', 'foo=bar\nhello=world')

    const { loadServer } = useServer()
    const { props } = loadServer({ rootDir: './tmp'})

    unlinkSync('./tmp')

    t.is(props.get('foo'), 'bar');
    t.is(props.get('hello'), 'world');
});
