import chalk from 'chalk';
import { BorderStyle } from 'boxen';
import { indentedBox, indentAllLines, wrap, nonBreakingWhitespace } from '../layout';
import { getColumns } from '../../config';
import { formatCallee } from '../format-callee';
import { formatContents } from '../format-contents';
import { formatTime } from '../format-time';
import { LogMessage } from '../log-message';
import { dynamicProgress } from '../dynamic-progress';

interface FormatData {
    timestamp: string;
    label: string;
    contents: string;
}

const formatInfo = ({ timestamp, label, contents }: FormatData) => {
    const columns = getColumns();
    const wrappedContent = wrap(
        `${label.replace(/ /g, nonBreakingWhitespace)}${nonBreakingWhitespace}${contents}`,
        columns
    );
    return indentAllLines(`${timestamp}${wrappedContent}`).trim();
};

const formatWarn = ({ timestamp, label, contents }: FormatData) => {
    const text = indentedBox(chalk.black.bgYellow.bold('  ⚠ WARNING '), contents, {
        padding: 1,
        borderColor: 'yellow'
    });
    return `${timestamp}${label}\n${text}`;
};

const formatError = ({ timestamp, label, contents }: FormatData) => {
    const text = indentedBox(chalk.white.bgRed.bold('  X ERROR '), contents, {
        padding: 1,
        borderColor: 'red',
        borderStyle: BorderStyle?.Double || 'double'
    });
    return `${timestamp}${label}\n${text}`;
};

const formatFatal = ({ timestamp, label, contents }: FormatData) => {
    const text = indentedBox(chalk.white.bgRed.bold('  🔥 FATAL '), contents, {
        padding: 1,
        borderColor: 'red',
        borderStyle: {
            topLeft: '🔥',
            topRight: '🔥',
            bottomLeft: '🔥',
            bottomRight: '🔥',
            horizontal: '-',
            vertical: '🔥'
        }
    });
    return `${timestamp}${label}\n${text}`;
};

const formatDebug = ({ timestamp, label, contents }: FormatData) => {
    const columns = getColumns();
    const wrappedContent = wrap(`${timestamp}${label} ${contents}`, columns);
    return indentAllLines(wrappedContent);
};

const formatHelp = ({ timestamp, label, contents }: FormatData) => {
    const text = indentedBox('', contents, {
        padding: 1,
        borderColor: 'blue',
        borderStyle: BorderStyle?.Single || 'single'
    });
    return `${timestamp}${label}\n${text}`;
};

export const formatLevel = (logMessage: LogMessage) => {
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

    const { type } = logMessage;
    const timestamp = formatTime(logMessage);
    const label = formatCallee(logMessage);
    const contents = formatContents(logMessage);

    if (type === 'HELP') {
        return formatHelp({ timestamp, label, contents });
    }

    if (type === 'PROGRESS') {
        const { message = '', percentage = 0 } = logMessage;
        return dynamicProgress.progress({ timestamp, label, message, percentage });
    }

    if (type === 'SUCCESS') {
        const { message } = logMessage;
        return dynamicProgress.success(message || '');
    }

    if (type === 'FAIL') {
        const { message } = logMessage;
        return dynamicProgress.fail(message || '');
    }

    if (type === 'INFO') {
        return formatInfo({ timestamp, label, contents });
    }

    if (type === 'WARN') {
        return formatWarn({ timestamp, label, contents });
    }

    if (type === 'ERROR') {
        return formatError({ timestamp, label, contents });
    }

    if (type === 'FATAL') {
        return formatFatal({ timestamp, label, contents });
    }

    if (type === 'DEBUG') {
        return formatDebug({ timestamp, label, contents });
    }

    return formatInfo({ timestamp, label, contents: '?????' + type + '\n' + contents });
};
