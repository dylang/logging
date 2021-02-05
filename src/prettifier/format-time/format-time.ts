import dateFormat from 'dateformat';
import parseMS from 'parse-ms';
import chalk from 'chalk';
import { logConfig } from '../../config';
import { rightJustify } from '../layout';
import { LogMessage } from '../log-message';

/*
const levels = {
    10: 'trace',
    20: 'debug',
    30: 'info',
    40: 'warn',
    50: 'error',
    60: 'fatal'
};
 */

export const formatTime = ({ duration, level, time }: LogMessage) => {
    const { days, hours, minutes, seconds, milliseconds } = parseMS(duration);
    const daysHoursMinutesAsMinutes = hours * 60 + days * 24 * 60 + minutes;
    const durationAsString =
        daysHoursMinutesAsMinutes > 0
            ? `${daysHoursMinutesAsMinutes} min`
            : `${seconds > 0 ? `${seconds}s` : ''}${
                  logConfig.isDebug
                      ? `${milliseconds < 10 ? ' ' : ''}${milliseconds < 100 ? ' ' : ''}${Math.round(milliseconds)}ms`
                      : ''
              }`;
    const timeString = dateFormat(time, 'longTime');
    const durationString = duration < (logConfig.isDebug ? 100 : 100) ? '·' : chalk.yellow(`+${durationAsString}`);
    const annotation = level < 30 ? 'DEBUG' : '';
    return chalk`{bgMagenta.white ${annotation}}{gray ${rightJustify(
        `${durationString} ${timeString}`,
        logConfig.indent - 1 - annotation.length
    )} }`;
};
