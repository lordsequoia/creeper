/* eslint-disable functional/no-throw-statement */
import dotenv from 'dotenv';
import fs from 'fs-extra'

export type Config = {
    readonly serverDir: string;
}

export type UseConfig = {
    readonly loadConfig: () => Config
}

export function useConfig(): UseConfig {

    function loadConfig(): Config {
        if (fs.existsSync('.creeper')) {
            dotenv.config({ path: '.creeper' });

            return { serverDir: process.env['SERVER_DIR'] || '.' }
        }

        throw new Error(`Creeper config file not found in current directory: .creeper`)
    }

    return { loadConfig }
}

export default useConfig