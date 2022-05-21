/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable functional/no-return-void */
export type LoggerFactory = {
    readonly createLogger: () => Logger
}

export type LogFunction = <T= any>(message: string | T, group?: string) => void

export type Logger = {
    readonly log: LogFunction
    readonly info: (message: string) => void
    readonly debug: (message: string) => void
    readonly success: (message: string) => void
    readonly error: (message: string, error?: Error) => void
}

export function useLoggerFactory(): LoggerFactory {
    
    function createLogger(): Logger {
        function log<T = any>(message: string | T, group?: string) {
            console.log(`[${group || 'MAIN'}] ${typeof message == 'string' ? message : JSON.stringify(message)}`)
        }

        return {
            log,
            info: (message: string): void => log(message, 'INFO'),
            debug: (message: string): void => log(message, 'DEBUG'),
            success: (message: string): void => log(message, 'SUCCESS'),
            error: (message: string, error?: Error): void => log(error ? { error , message } : message, 'ERROR'),
        }
    }

    return { createLogger }
}

export const defaultLogger =  useLoggerFactory().createLogger()

export const useLogger = (): Logger => defaultLogger || useLoggerFactory().createLogger()

export default useLogger