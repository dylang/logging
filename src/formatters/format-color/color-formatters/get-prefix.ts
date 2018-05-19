import chalk from 'chalk';
import {timestamp} from './timestamp';

export const getPrefix = (type: string, label: string, color: string) => {
    const labelWithColor = label || type
        ? `[${chalk[color](`${label}${label && type ? ' ' : ''}${type}`)}] `
        : '';

    return `${chalk.gray(timestamp())} ${labelWithColor}`;
};
