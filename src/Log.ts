import {LEVEL, FORMAT} from './types';
import {streamStdout, streamRaw} from './streams';
import {formatColor, formatJson, dynamicProgress} from './formatters';
import {globalState} from './global-state';

export class Log {
    constructor() {
    }

    // Needs better name
    public help(...args: any[]): void {
        const output = globalState.getOutputMode() === FORMAT.JSON
            ? formatJson(LEVEL.HELP, args)
            : formatColor(LEVEL.HELP, args);
        return streamStdout(output);
    }
    public debug(...args: any[]): void {
        const output = globalState.getOutputMode() === FORMAT.JSON
            ? formatJson(LEVEL.DEBUG, args)
            : formatColor(LEVEL.DEBUG, args);
        return streamStdout(output);
    }
    public info(...args: any[]): void {
        const output = globalState.getOutputMode() === FORMAT.JSON
            ? formatJson(LEVEL.INFO, args)
            : formatColor(LEVEL.INFO, args);
        return streamStdout(output);

    }
    public warn(...args: any[]): void {
        const output = globalState.getOutputMode() === FORMAT.JSON
            ? formatJson(LEVEL.WARN, args)
            : formatColor(LEVEL.WARN, args);
        return streamStdout(output);
    }
    public error(...args: any[]): void {
        const output = globalState.getOutputMode() === FORMAT.JSON
            ? formatJson(LEVEL.ERROR, args)
            : formatColor(LEVEL.ERROR, args);
        return streamStdout(output);

    }
    public progress(message: string, percentage?: number): void {
        if (globalState.getOutputMode() === FORMAT.COLOR) {
            return dynamicProgress.progress(message, percentage);
        }
        const output = formatJson(LEVEL.PROGRESS, [message, percentage]);
        return streamStdout(output);
    }
    public success(message: string): void {
        if (globalState.getOutputMode() === FORMAT.COLOR) {
            return dynamicProgress.success(message);
        }
        const output = formatJson(LEVEL.PROGRESS, [message]);
        return streamStdout(output);
    }
    public fail(message: string): void {
        if (globalState.getOutputMode() === FORMAT.COLOR) {
            return dynamicProgress.fail(message);
        }
        const output = formatJson(LEVEL.PROGRESS, [message]);
        return streamStdout(output);
    }

    public raw(message: string): void {
        streamRaw(message);
    }
}
