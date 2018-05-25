import {log} from './log';

export const proxyConsole = (console: Console = global.console) => {
    console.info = log.info;
    console.log = log.info;
    console.warn = log.warn;
    console.error = log.error;
    console.debug = log.debug;
};
