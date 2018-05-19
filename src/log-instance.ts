import {Log} from './Log';

export const log = new Log();

console.log = (...args: any[]) => log.info(...args);
