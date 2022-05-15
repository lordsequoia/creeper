<h1 align="center">Welcome to creeper-ts 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D10-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> creeper-ts: a TypeScript SDK for dissecting (vanilla) Minecraft servers and server files.

## Prerequisites

- node >=10

## Install

```sh
npm install creeper-ts
```

## Run tests

```sh
npm run test
```

## Examples

### Update the 'level-name' property in server.properties

```ts
import { useServerFs, useServerProps } from 'creeper-ts'

function main(rootDir: string, newLevelName: string) {

  const { loadFromDisk } = useServerFs()
  const { loadFromFs, writeToFs } = useServerProps()

  const fs = loadFromDisk(config.serverDir)
  const props = loadFromFs(fs)

  props.set('level-name', newLevelName)

  writeToFs(props, fs)
}

main('/data/minecraft', 'new-world')
```

### Load a server from disk

```ts
import { useServer } from 'creeper-ts'

function main(rootDir: string): Server {
  const { loadServer } = useServer()

  return loadServer({ rootDir })
}

main('/data/minecraft')
```

### Serialize server props
```ts
function main () {
  const server = createServer()

  const { serialize } = useServerProps()

  server.props.set('level-name', 'creeper-world')
  const propsString = serialize(server.props)

  console.log(propsString)

  // Outputs: level-name=creeper-world
}
```

## Author

👤 **LordSequoia**

* Website: https://seqmc.com
* Github: [@lordsequoia](https://github.com/lordsequoia)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_