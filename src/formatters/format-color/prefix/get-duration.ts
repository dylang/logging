import * as timeSpan from 'time-span';
import * as prettyMs from 'pretty-ms';
import chalk from 'chalk';
import {logConfig} from '../../../config';
import {rightJustify} from '../helpers';

const applicationStart = timeSpan();
let lastCall = timeSpan();

export const getDuration = (startTimeSpan: timeSpan.TimeSpanObject = lastCall || applicationStart) => {
    const ms = startTimeSpan();
    lastCall = timeSpan();
    const durationString = ms < 1000 ? '·' : prettyMs(ms, {secDecimalDigits: 0, msDecimalDigits: 0});
    return chalk`{gray ${rightJustify(durationString, logConfig.indent - 1)} }`;
};
