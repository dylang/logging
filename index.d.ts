/**
 * Lightweight informative modern console logging.
 *
 * @param moduleName - string to describe the log purpose
 * @param options
 * @returns logger
 */
export default function logging(moduleName: string, options?: logging.Options): logging.Logger;

export namespace logging {
    interface Options {
        debugFunction?(message?: unknown, ...optionalParams: unknown[]): void;
        logFunction?(message?: unknown[]): void;
    }
    type LoggerFunction = (...messages: unknown[]) => void;
    interface Logger {
        info: LoggerFunction;
        warn: LoggerFunction;
        error: LoggerFunction;
        debug: LoggerFunction;
        fatal: LoggerFunction;
        trace: LoggerFunction;
    }
}
