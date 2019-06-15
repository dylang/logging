import * as stream from 'stream';
import { streamStdout, streamRaw } from './streams';
import { formatColor, formatJson, dynamicProgress } from './formatters';
import { logConfig } from './config';

const format = (level: Level, args: any[]) => {
    return (logConfig.outputJson ? formatJson : formatColor)(level, args);
};

export const log = {
    // Needs better name
    help: (...args: any[]) => {
        const output = format('HELP', args);
        return streamStdout(output);
    },
    debug: (...args: any[]) => {
        if (logConfig.outputJson || logConfig.isDebug) {
            const output = format('DEBUG', args);
            return streamStdout(output);
        }
    },
    info: (...args: any[]) => {
        const output = format('INFO', args);
        return streamStdout(output);
    },
    warn: (...args: any[]) => {
        const output = format('WARN', args);
        return streamStdout(output);
    },
    error: (...args: any[]) => {
        const output = format('ERROR', args);
        return streamStdout(output);
    },
    progress: (message: string, percentage?: number) => {
        if (logConfig.outputJson) {
            const output = formatJson('PROGRESS', [message, percentage]);
            return streamStdout(output);
        }
        return dynamicProgress.progress(message, percentage);
    },
    success: (message: string) => {
        if (logConfig.outputJson) {
            const output = formatJson('PROGRESS', [message]);
            return streamStdout(output);
        }
        return dynamicProgress.success(message);
    },
    fail: (message: string) => {
        if (logConfig.outputJson) {
            const output = formatJson('PROGRESS', [message]);
            return streamStdout(output);
        }
        return dynamicProgress.fail(message);
    },
    raw: (message: string) => {
        return streamRaw(message);
    },
    pipe: (stdout: stream.Duplex, stderr: stream.Duplex) => {
        stdout.on('data', (buffer: Buffer) => streamRaw(buffer.toString()));
        stderr.on('data', (buffer: Buffer) => streamRaw(buffer.toString()));
    }
};
