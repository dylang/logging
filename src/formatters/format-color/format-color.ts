import {LEVEL} from '../../types';
import {TemplateTag, stripIndentTransformer} from 'common-tags';
import * as stripAnsi from 'strip-ansi';
import * as termSize from 'term-size';
import {formatAny, decorateWithLevel, DynamicProgress} from './color-formatters';

const stripIndent = new TemplateTag(stripIndentTransformer());

const prefixWidth = 7;
const columns = termSize().columns - (process.env.NODE_ENV === 'test' ? 20 : 0) - prefixWidth;

export const dynamicProgress = new DynamicProgress();

const joinArgsWithNewlinesOrSpaces = (contentArray: string[]) => contentArray.reduce((acc, current, index) => {
    const previousContent = contentArray[index - 1] || '';
    // If either of these include a new line then add a new line.
    // By appending them we can check them both at the same time.
    // .trim() in case there's already a hardcoded \n in the message.
    const startsWithNewline = current.startsWith('\n');
    const addNewlineBeforeCurrent = !startsWithNewline && (stripAnsi(current).length > columns || `${previousContent} ${current}`.includes('\n'));
    return acc + (addNewlineBeforeCurrent ? ' \n' : previousContent ? ' ' : '') + current;
}, '');

export const formatColor = (level: LEVEL, args: any[]) => {
    const formattedMessages = args
        .filter((arg: any) => arg !== '')
        .map((arg: any) => formatAny(arg));
    const contentJoined = joinArgsWithNewlinesOrSpaces(formattedMessages);
    const contentWithoutExcessIndentation = stripIndent`${contentJoined}`;
    dynamicProgress.clear();
    return decorateWithLevel(level, contentWithoutExcessIndentation);
};
