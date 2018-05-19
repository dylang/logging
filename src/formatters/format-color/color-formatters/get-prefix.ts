import chalk from 'chalk';
import {duration} from './duration';

const durationLength = 7;

export const getPrefix = () => {
    const durationString = duration();
    const durationPadding = ' '.repeat(Math.max(durationLength - durationString.length, 0));
    return `${chalk.gray(durationPadding)}${chalk.gray(durationString)}`;
};
