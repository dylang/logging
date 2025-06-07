/**
 * Lightweight informative modern console logging.
 *
 * @param moduleName - string to describe the log purpose
 * @param options
 * @returns logger
 */

// Define interfaces and types outside the namespace to avoid redeclaration
interface LoggerOptions {
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

/**
 * Creates a logger with the given module name and options
 */
export default function create(moduleName: string, options?: LoggerOptions): Logger;
