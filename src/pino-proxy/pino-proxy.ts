import pino, { BaseLogger, LoggerOptions, Bindings } from 'pino';
import { prettifier } from '../prettifier';
import { getMixins } from '../mixins';
import { LogMessage } from '../prettifier/log-message';

export interface Logger extends BaseLogger {
    info: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    fatal: (...args: unknown[]) => void;
    debug: (...args: unknown[]) => void;
    trace: (...args: unknown[]) => void;

    progress: (message: string, percentage?: number) => void;
    success: (message: string) => void;
    fail: (message: string) => void;
}

declare module 'pino' {
    export interface LoggerOptions {
        prettifier?: (options?: unknown) => (logMessage: LogMessage) => void;
    }
}

const createPinoProxy = (pinoLogger: BaseLogger) =>
    new Proxy(pinoLogger, {
        get: function(target, name) {
            if (
                name === 'info' ||
                name === 'warn' ||
                name === 'error' ||
                name === 'fatal' ||
                name === 'debug' ||
                name === 'trace'
            ) {
                return (...args: unknown[]) => target[name]({ data: args, type: name.toUpperCase() });
            }

            if (name === 'progress') {
                return (message: string, percentage?: number) => target.info({ type: 'PROGRESS', message, percentage });
            }

            if (name === 'success') {
                return (message: string, percentage?: number) => target.info({ type: 'SUCCESS', message, percentage });
            }

            if (name === 'fail') {
                return (message: string) => target.warn({ type: 'FAIL', message });
            }

            if (name === 'help') {
                return (...args: unknown[]) => target.info({ data: args, type: 'HELP' });
            }

            if (name === 'child') {
                return (bindings: Bindings) => createPinoProxy(target.child(bindings));
            }

            return target[name];
        }
    });

export const pinoProxy = (pinoOptions: LoggerOptions = {}) => {
    const pinoLogger = pino({
        prettyPrint: {
            levelFirst: true
        },
        mixin: getMixins,
        serializers: {
            [Symbol.for('pino.*')]: (x) => {
                return x;
            }
        },
        prettifier,
        ...pinoOptions
    });

    return createPinoProxy(pinoLogger) as Logger;
};
