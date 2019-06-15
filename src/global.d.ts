declare module 'nicely-format';
declare module 'boxen';
declare module 'term-size';
declare module 'trim-newlines';
declare module 'strip-ansi';
declare module 'fade-steps';
declare module 'lodash.groupby';
declare module 'strip-indent';
declare module 'min-indent';

type Level = 'HELP' | 'INFO' | 'WARN' | 'ERROR' | 'DEBUG' | 'PROGRESS';

// interface Config {
//    indent: number;
// }

interface Log {
    help(...args: any[]): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    progress(message: string, percentage?: number | undefined): void;
    success(message: string): void;
    fail(message: string): void;
    raw(message: string): void;
}

interface CreateLog {
    (): Log;
    log?: Log;
    default?: Log;
    logConfig?: any;
}
