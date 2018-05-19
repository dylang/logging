import {LEVEL} from './types';
import {writeStdOut} from './writters';

export class Log {
    constructor(public label: string) {
    }

    public debug(...messages: any[]): void {
        writeStdOut(LEVEL.DEBUG, messages);
    }
    public info(...messages: any[]): void {
        writeStdOut(LEVEL.INFO, messages);
    }
    public warn(...messages: any[]): void {
        writeStdOut(LEVEL.WARN, messages);
    }
    public error(...messages: any[]): void {
        writeStdOut(LEVEL.ERROR, messages);
    }
    public fatal(...messages: any[]): void {
        writeStdOut(LEVEL.FATAL, messages);
    }
    public trace(...messages: any[]): void {
        writeStdOut(LEVEL.TRACE, messages);
    }
}

export const createLog = (label: string) => new Log(label);

export const defaultLog = new Log('');
