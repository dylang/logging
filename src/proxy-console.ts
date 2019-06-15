import { log } from './log';

export const proxyConsole = (console: Console = global.console) => {
    console.info = (...args: any[]) => log.info(...args);
    console.log = (...args: any[]) => log.info(...args);
    console.warn = (...args: any[]) => log.warn(...args);
    console.error = (...args: any[]) => log.error(...args);
    console.debug = (...args: any[]) => log.debug(...args);
};
