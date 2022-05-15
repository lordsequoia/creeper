import test from 'ava';

import useServerProps from './server-props';
import { ServerProps } from './server-props';

test('serialize', (t) => {
    const { serialize } = useServerProps()

    const props = new Map<string, string>() as ServerProps
    props.set('hello', 'world')
    
    t.deepEqual(serialize(props), 'hello=world');
});

test('deserialize', (t) => {
    const { deserialize } = useServerProps()

    const props = new Map<string, string>() as ServerProps
    props.set('hello', 'world')

    t.deepEqual(deserialize('hello=world'), props);
});
