import test from 'ava';

import useServerFs from './server-fs';

//t.deepEqual(await asyncABC(), ['a', 'b', 'c']);

test('loadFromDisk', async (t) => {
    const { loadFromDisk } = useServerFs()
    const fs = loadFromDisk('./tmp-server-fs')

    t.is(fs.exists('server.properties'), false)
});
