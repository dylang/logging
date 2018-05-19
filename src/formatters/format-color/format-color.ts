import * as nicelyFormat from 'nicely-format';
import * as boxen from 'boxen';
import * as wrapAnsi from 'wrap-ansi';
import * as termSize from 'term-size';
import is from '@sindresorhus/is';
import {LEVEL} from '../types';
import {serializeError} from '../serializers';
import chalk from 'chalk';

//chalk.yellow(`DEBUG ${this.title}`)
// chalk.blue(this.title)
//chalk.red(`ERROR ${this.title}`)
// chalk.red(`========= FATAL ${this.title} =========`)
// chalk.red(`TRACE ${this.title}`)

const time = () => {
    const now = new Date();
    const date = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
    return date.toISOString().replace(/.*T(.*)Z/, '$1');
};

const indentText = (text: string): string => text.replace(/^(?!\s+$)/mg, ' '.repeat(13));

const formatInfo = (label: string , formattedMessages: string[]) => {
    return [`[${label || 'info'}]`, ...formattedMessages];
};

const formatWarn = (label: string, formattedMessages: string[]) => {
    const columns = Math.min(termSize().columns, 120);
    const text = wrapAnsi(formattedMessages.join(' '), columns, {trim: false});
    const message = boxen(text, {padding: 1, borderColor: 'yellow'});
    return [chalk.yellow(`WARN [${label}]`), `\n${message}`];
};

const formatError = (label: string, formattedMessages: string[]) => {
    const columns = Math.min(termSize().columns, 120);
    const text = wrapAnsi(formattedMessages.join(' '), columns, {trim: false});
    const message = boxen(text, {padding: 1, borderColor: 'red', borderStyle: 'double'});
    return [chalk.red(`ERROR [${label}]`), `\n${message}`];
};

const formatObject = (object: object) => nicelyFormat(object, {
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
        key: 'cyan'
    }
});

const formatArg = (arg: any): string => {
    if (is.string(arg)) {
        return arg;
    }
    if (is.error(arg)) {
        const errorObject = serializeError(arg);
        const {
            name,
            message,
            stack,
            ...errorMetadata
        } = errorObject;
        return [
            chalk.red.bold(`${name}: ${message}`),
            stack.replace(`${name}: ${message}\n`, ''),
            Object.entries(errorMetadata).map(([key, value]) => `${key}: ${formatObject(value)}`).join('\n')
        ].filter(Boolean).join('\n');
    }
    return formatObject(arg);
};

const formatLevel = (level: LEVEL, label: string, formattedMessages: string[]) => {
    switch (level) {
        case LEVEL.INFO:
            return formatInfo(label, formattedMessages);
        case LEVEL.WARN:
            return formatWarn(label, formattedMessages);
        case LEVEL.ERROR:
            return formatError(label, formattedMessages);
        case LEVEL.FATAL:
            return formatError(label, formattedMessages);
        case LEVEL.DEBUG:
            return formatInfo(label, formattedMessages);
        case LEVEL.TRACE:
            return formatWarn(label, formattedMessages);
        default:
            return formatInfo(label, formattedMessages);
    }
};

export const formatColor = (level: LEVEL, label: string, args: any[]) => {
    const formattedMessages: string[] = args.map((arg: any) => formatArg(arg));
        // .map((text: string, index: number) => index > 0 ? indentText(text) : text);

    const content = formatLevel(level, label, formattedMessages);
    return [chalk.gray(time()), ...content].join(' ');
};
