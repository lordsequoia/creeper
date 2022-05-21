#!/usr/bin/env node

import { useServer, useServerPublisher } from './index';

function main(rootDir?: string) {
    const { createPublisher } = useServerPublisher()
    const { loadServer } = useServer()
    const server = loadServer({ rootDir })
    const { startWatching } = createPublisher(server)

    const stopWatching = startWatching()

    return { stopWatching }
}

main('./tmp')