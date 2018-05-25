declare module 'nicely-format';
declare module 'serialize-error';
declare module 'boxen';
declare module 'term-size';
declare module 'strip-ansi';
declare module 'fade-steps';
declare module 'lodash.groupby';

type Level =
    'HELP' |
    'INFO' |
    'WARN' |
    'ERROR' |
    'DEBUG' |
    'PROGRESS';

interface Config {
    indent: number;
}

interface CreateLog {
    (): CreateLog;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    debug(...args: any[]): void;
    progress(...args: any[]): void;
    success(...args: any[]): void;
    failure(...args: any[]): void;
}
