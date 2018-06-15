import {indentAllLines} from './indent';
import {wrap} from './wrap';
import boxen from 'boxen';
import trimNewlines from 'trim-newlines';
import {getColumns, getColumnsWithBoxen} from '../../../config';

/*
const boxen = (str: string, borderColor: string) => [
    chalk[borderColor].underline(' '.repeat(str.split('\n').map((line: string) => (line || '').length).sort().reverse()[0])),
    '',
    str,
    chalk[borderColor].underline(' '.repeat(str.split('\n').map((line: string) => (line || '').length).sort().reverse()[0])),
    ''
].join('\n');
*/

export const indentedBox = (content: string, boxenOptions: any) => {
    const columns = getColumns();
    return columns > 40
        ? indentAllLines(boxen(wrap(trimNewlines(content.trimRight()), getColumnsWithBoxen()), boxenOptions))
        : wrap(content, columns);
};
