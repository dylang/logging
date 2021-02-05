import is from '@sindresorhus/is';
import pino, { BaseLogger, LoggerOptions, Bindings } from 'pino';
import { prettifier } from '../prettifier';
import { getMixins } from '../mixins';

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

const createPinoProxy = (pinoLogger: BaseLogger) =>
    new Proxy(pinoLogger, {
        get: function (target, name) {
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

export function pinoProxy(): Logger;
export function pinoProxy(name?: string): Logger;
export function pinoProxy(pinoOptions?: LoggerOptions): Logger;
export function pinoProxy(pinoOptions?: string | LoggerOptions): Logger {
    const pinoLogger = pino({
        prettyPrint: true,
        //nestedKey: 'payload',
        mixin: getMixins,
        prettifier,
        ...(is.string(pinoOptions) ? { name: pinoOptions } : pinoOptions)
    });

    return createPinoProxy(pinoLogger) as Logger;
}
