import * as boxen from 'boxen';
import * as wrapAnsi from 'wrap-ansi';
import * as termSize from 'term-size';
import {LEVEL} from '../../types';
import {getPrefix} from './get-prefix';

const columns = termSize().columns - (process.env.NODE_ENV === 'test' ? 20 : 0);
const prefixWidth = 13;
const boxenPadding = 8;

const indent = (str: string) => ' '.repeat(prefixWidth) + str.replace(/\n/g, '\n' + ' '.repeat(prefixWidth));

const formatHelp = (label: string, content: string) => {
    const text = wrapAnsi(content, columns - prefixWidth - boxenPadding, {trim: false, hard: true});
    const message = columns > 40
        ? indent(boxen(text, {padding: 1, borderColor: 'blue', borderStyle: 'single'}))
        : text;
    return `${getPrefix('', label, 'blue')}\n${message}`;
};

const formatInfo = (label: string , content: string) => {
    const spaceToOffsetPrefixForLineWrapping = (label || 'INFO').length + prefixWidth + 4;
    const wrappedContent = wrapAnsi(content, columns - spaceToOffsetPrefixForLineWrapping, {trim: false, hard: true});
    const wrappedAndIndentedContent = wrappedContent
        .replace(/\n/g, `\n${' '.repeat(13)}`);
    return `${getPrefix('', label, 'blue')}${wrappedAndIndentedContent}`;
};

const formatWarn = (label: string, content: string) => {
    const text = wrapAnsi(content, columns - prefixWidth - boxenPadding, {trim: false, hard: true});
    const message = columns > 40
        ? indent(boxen(text, {padding: 1, borderColor: 'yellow'}))
        : text;
    return `${getPrefix('WARNING', label, 'yellow')}\n${message}`;
};

const formatError = (label: string, content: string) => {
    const text = wrapAnsi(content, columns - prefixWidth - boxenPadding, {trim: false, hard: true});
    const message = columns > 40
        ? indent(boxen(text, {padding: 1, borderColor: 'red', borderStyle: 'double'}))
        : text;
    return `${getPrefix('ERROR', label, 'red')}\n${message}`;
};

export const decorateWithLevel = (level: LEVEL, label: string, content: string) => {
    switch (level) {
        case LEVEL.HELP:
            return formatHelp(label, content);
        case LEVEL.INFO:
            return formatInfo(label, content);
        case LEVEL.WARN:
            return formatWarn(label, content);
        case LEVEL.ERROR:
            return formatError(label, content);
        case LEVEL.DEBUG:
            return formatInfo(label, content);
        default:
            return formatInfo(label, content);
    }
};
