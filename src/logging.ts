import chalk, { type ChalkInstance } from 'chalk';
import createDebug from 'debug';
import nicelyFormat from 'nicely-format';

// Define types inline
export type LoggerFunction = (...messages: unknown[]) => void;

export interface Logger {
    debug: LoggerFunction;
    info: LoggerFunction;
    warn: LoggerFunction;
    error: LoggerFunction;
    child: (childName: string) => Logger;
}

export interface LoggerOptions {
    debugFunction?: (...params: unknown[]) => void;
    logFunction?: (...params: unknown[]) => void;
}

interface FormatTheme {
    tag: string;
    content: string;
    prop: string;
    value: string;
    number: string;
    string: string;
    date: string;
    symbol: string;
    regex: string;
    function: string;
    error: string;
    boolean: string;
    label: string;
    bracket: string;
    comma: string;
    misc: string;
    key: string;
}

interface FormatOptions {
    highlight: boolean;
    min: boolean;
    theme: FormatTheme;
}

interface LoggerParams {
    title: string | ChalkInstance;
    messages: unknown[];
    logFunction: (...params: unknown[]) => void;
}

const time = (): string => {
    const now = new Date();
    const date = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
    return date.toISOString().replace(/.*T(.*)Z/, '$1');
};

const indentText = (text: string): string => text.replace(/^(?!\s+$)/gm, ' '.repeat(13)).trim();

const logger = ({ title, messages, logFunction }: LoggerParams): void => {
    const formattedMessages = messages
        .map((message: unknown) => {
            if (typeof message === 'string') {
                return message;
            }

            return nicelyFormat(message, {
                highlight: true,
                min: true,
                theme: {
                    tag: 'cyan',
                    content: 'reset',
                    prop: 'yellow',
                    value: 'green',
                    number: 'green',
                    string: 'reset',
                    date: 'green',
                    symbol: 'red',
                    regex: 'red',
                    function: 'blue',
                    error: 'red',
                    boolean: 'yellow',
                    label: 'blue',
                    bracket: 'grey',
                    comma: 'grey',
                    misc: 'grey',
                    key: 'cyan',
                },
            } as FormatOptions);
        })
        .map((text: string) => indentText(text));

    logFunction(chalk.gray(time()), `[${title}]`, ...formattedMessages);
};

export const createLogger = (
    title: string,
    { debugFunction = createDebug(title), logFunction = console.log }: LoggerOptions = {}
): Logger => {
    return {
        debug(...messages: unknown[]): void {
            logger({
                title: chalk.yellow(`DEBUG ${title}`),
                messages,
                logFunction: debugFunction,
            });
        },
        info(...messages: unknown[]): void {
            logger({
                title: chalk.blue(title),
                messages,
                logFunction,
            });
        },
        warn(...messages: unknown[]): void {
            logger({
                title: chalk.yellow(`WARNING ${title}`),
                messages,
                logFunction,
            });
        },
        error(...messages: unknown[]): void {
            logger({
                title: chalk.red(`ERROR ${title}`),
                messages,
                logFunction,
            });
        },
        child(childName: string): Logger {
            return createLogger(`${title}:${childName}`, { debugFunction, logFunction });
        },
    };
};


