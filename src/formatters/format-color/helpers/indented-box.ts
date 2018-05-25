import {indentAllLines} from './indent';
import {wrap} from './wrap';
import * as boxen from 'boxen';
import {getColumns, getColumnsWithBoxen} from '../../../config';

export const indentedBox = (content: string, boxenOptions: object) => {
    const columns = getColumns();
    return columns > 40
        ? indentAllLines(boxen(wrap(content, getColumnsWithBoxen()), boxenOptions))
        : wrap(content, columns);
};
