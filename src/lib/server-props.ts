/* eslint-disable functional/no-return-void */
/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/prefer-readonly-type */
import { ServerFs } from './server-fs';
export const SERVER_PROPS_FILENAME = 'server.properties'

export type ServerProps = Map<string, string>

export type UseServerProps = {
    serialize: (value: ServerProps) => string;
    deserialize: (value: string) => ServerProps;
    loadFromFs: (fs: ServerFs) => ServerProps;
    writeToFs: (props: ServerProps, fs: ServerFs) => void;
}

export function useServerProps(): UseServerProps {

    function serialize(value: ServerProps) {
        const output = new Set<string>([])

        value.forEach((value: string, key: string) => {
            output.add(`${key}=${value}`)
        })

        return Array.from(output).join("\n")
    }

    function deserialize(value: string): ServerProps {
        const map = new Map<string, string>([])

        value.split("\n").map((line: string) => line.trim().split('=', 2))
            .forEach(([key, value]) => {
                map.set(key, value)
            })


        return map as ServerProps

    }

    function loadFromFs(fs: ServerFs): ServerProps {
        if (!fs.exists(SERVER_PROPS_FILENAME))
            throw new Error(`No server.properties file found.`)

        const props = deserialize(String(fs.read(SERVER_PROPS_FILENAME)))

        return props
    }

    function writeToFs(props: ServerProps, fs: ServerFs): void {
        const data = serialize(props)

        fs.write(SERVER_PROPS_FILENAME, data)

        return
    }

    return { serialize, deserialize, loadFromFs, writeToFs }
}

export default useServerProps