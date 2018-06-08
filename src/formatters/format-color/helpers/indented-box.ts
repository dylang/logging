import {indentAllLines} from './indent';
import {wrap} from './wrap';
import * as boxen from 'boxen';
import * as trimNewlines from 'trim-newlines';
import {getColumns, getColumnsWithBoxen} from '../../../config';

export const indentedBox = (content: string, boxenOptions: object) => {
    const columns = getColumns();
    return columns > 40
        ? indentAllLines(boxen(wrap(trimNewlines(content.trimRight()), getColumnsWithBoxen()), boxenOptions))
        : wrap(content, columns);
};
