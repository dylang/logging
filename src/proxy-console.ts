import { logger } from './logger';

export const proxyConsole = (console: Console = global.console) => {
    console.info = (...args: unknown[]) => logger.info(...args);
    console.log = (...args: unknown[]) => logger.info(...args);
    console.warn = (...args: unknown[]) => logger.warn(...args);
    console.error = (...args: unknown[]) => logger.error(...args);
    console.debug = (...args: unknown[]) => logger.debug(...args);
};
