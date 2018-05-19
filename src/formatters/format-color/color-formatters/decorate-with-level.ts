import * as boxen from 'boxen';
import * as wrapAnsi from 'wrap-ansi';
import * as termSize from 'term-size';
import {LEVEL} from '../../../types';
import {getPrefix} from './get-prefix';
import {getFilename} from './get-filename';

const prefixWidth = 8;
const columns = termSize().columns - (process.env.NODE_ENV === 'test' ? 20 : 1) - prefixWidth;
const boxenPadding = 12;

const indent = (str: string) => ' '.repeat(prefixWidth) + str.replace(/\n/g, '\n' + ' '.repeat(prefixWidth));

const formatHelp = (content: string) => {
    const text = wrapAnsi(content, columns - boxenPadding, {trim: false, hard: true});
    const message = columns > 40
        ? indent(boxen(text, {padding: 1, borderColor: 'blue', borderStyle: 'single'}))
        : text;
    return `${getPrefix()}\n${message}`;
};

const formatInfo = (content: string) => {
    const {shortenedName} = getFilename();
    const wrappedContent = wrapAnsi(`${getPrefix()} [${shortenedName}] ${content}`, columns, {trim: false, hard: true});
    return wrappedContent.replace(/\n/g, `\n${' '.repeat(prefixWidth)}`);
};

const formatWarn = (content: string) => {
    const text = wrapAnsi(`WARNING\n\n${content}`, columns - boxenPadding, {trim: false, hard: true});
    const message = columns > 40
        ? indent(boxen(text, {padding: 1, borderColor: 'yellow'}))
        : text;
    const {packageName, relativeFilename} = getFilename();
    return `${getPrefix()} [${packageName} ${relativeFilename}]\n${message}`;
};

const formatError = (content: string) => {
    const text = wrapAnsi(`ERROR\n\n${content}`, columns - boxenPadding, {trim: false, hard: true});
    const message = columns > 40
        ? indent(boxen(text, {padding: 1, borderColor: 'red', borderStyle: 'double'}))
        : text;
    const {packageName, relativeFilename} = getFilename();
    return `${getPrefix()} [${packageName} ${relativeFilename}]\n${message}`;
};

export const decorateWithLevel = (level: LEVEL, content: string) => {
    switch (level) {
        case LEVEL.HELP:
            return formatHelp(content);
        case LEVEL.INFO:
            return formatInfo(content);
        case LEVEL.WARN:
            return formatWarn(content);
        case LEVEL.ERROR:
            return formatError(content);
        case LEVEL.DEBUG:
            return formatInfo(content);
        default:
            return formatInfo(content);
    }
};
