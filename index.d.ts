declare module 'logging' {
    interface Options {
        debugFunction?(message?: unknown, ...optionalParams: unknown[]): void;
    }

    type LoggerFunction = (...messages: unknown[]) => void;

    interface Logger {
        info: LoggerFunction;
        warn: LoggerFunction;
        error: LoggerFunction;
        debug: LoggerFunction;
    }

    export default function createLogger(moduleName: string, options?: Options): Logger;
}
