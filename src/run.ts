#!/usr/bin/env node

import { Emission, useEmitterClient, useServer } from './index';

function serve(rootDir?: string) {
    const { loadServer } = useServer()
    return loadServer({ rootDir, emitFs: true })
}

function main() {
    const server = serve('/Volumes/HOME/server')
    console.log(`Server is: ${typeof server}`)

    const { createClient } = useEmitterClient()

    const client = createClient({ host: '127.0.0.1', port: 7001 })

    client.subscribeTo('fs', (emission: Emission) => {
        const action = emission.data as { readonly file: string, readonly event: string }

        console.log(`YO! ${action.event} on: ${action.file}`)
    })
}

export default main()