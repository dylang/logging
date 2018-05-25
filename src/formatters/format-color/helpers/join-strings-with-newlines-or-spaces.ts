import * as stripAnsi from 'strip-ansi';
import {getColumns} from '../../../config';

export const joinStringsWithNewlinesOrSpaces = (contentArray: string[]) => contentArray.reduce((acc, current, index) => {
    const columns = getColumns();

    const previousContent = contentArray[index - 1] || '';
    // If either of these include a new line then add a new line.
    // By appending them we can check them both at the same time.
    // .trim() in case there's already a hardcoded \n in the message.
    const startsWithNewline = current.startsWith('\n');
    const addNewlineBeforeCurrent = index > 0
        && !startsWithNewline
        && (stripAnsi(current).length > columns || `${previousContent} ${current}`.includes('\n'));
    return acc + (addNewlineBeforeCurrent ? ' \n' : previousContent ? ' ' : '') + current;
}, '');
