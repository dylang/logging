import chalk from 'chalk';
import {getDuration, getPackageAndFilename} from '../prefix';
import {indentedBox, indentAllExceptFirstLine, wrap, nonBreakingWhitespace} from '../helpers';
import {getColumns} from '../../../config';

const formatInfo = (duration: string, packageName: string, content: string) => {
    const columns = getColumns();
    const wrappedContent = wrap(`${packageName.replace(/ /g, nonBreakingWhitespace)}${nonBreakingWhitespace}${content}`, columns);
    return indentAllExceptFirstLine(`${duration}${wrappedContent}`);
};

const formatWarn = (duration: string, packageName: string, content: string) => {
    const text = indentedBox(chalk`{black.bgYellow > WARNING <}\n\n${content}`, {padding: 1, borderColor: 'yellow'});
    return `${duration}${packageName}\n${text}`;
};

const formatError = (duration: string, packageName: string, content: string) => {
    const text = indentedBox(chalk`{white.bgRed > ERROR <}\n\n${content}`, {padding: 1, borderColor: 'red', borderStyle: 'double'});
    return `${duration}${packageName}\n${text}`;
};

const formatDebug = (duration: string, packageName: string, content: string) => {
    const columns = getColumns();
    const wrappedContent = wrap(`${duration}${packageName} ${content}`, columns);
    return indentAllExceptFirstLine(wrappedContent);
};

const formatHelp = (duration: string, packageName: string, content: string) => {
    const text = indentedBox(content, {padding: 1, borderColor: 'blue', borderStyle: 'single'});
    return `${duration}${packageName}\n${text}`;
};

export const decorateWithLevel = (level: Level, content: string) => {
    const duration = getDuration(level);
    const packageName = getPackageAndFilename(level);
    switch (level) {
        case 'INFO':
            return formatInfo(duration, packageName, content);
        case 'WARN':
            return formatWarn(duration, packageName, content);
        case 'ERROR':
            return formatError(duration, packageName, content);
        case 'DEBUG':
            return formatDebug(duration, packageName, content);
        case 'HELP':
            return formatHelp(duration, packageName, content);
        default:
            return formatInfo(duration, packageName, content);
    }
};
