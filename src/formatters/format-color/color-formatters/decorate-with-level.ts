import {getDuration, getPackageAndFilename} from '../prefix';
import {indentedBox, indentAllExceptFirstLine, wrap, nonBreakingWhitespace} from '../helpers';
import {getColumns} from '../../../config';

const formatInfo = (prefix: string, content: string) => {
    const columns = getColumns();
    const wrappedContent = wrap(`${prefix.replace(/\s/g, nonBreakingWhitespace)}${nonBreakingWhitespace}${content}`, columns);
    return indentAllExceptFirstLine(wrappedContent);
};

const formatWarn = (prefix: string, content: string) => {
    const text = indentedBox(`WARNING\n\n${content}`, {padding: 1, borderColor: 'yellow'});
    return `${prefix}\n${text}`;
};

const formatError = (prefix: string, content: string) => {
    const text = indentedBox(`ERROR\n\n${content}`, {padding: 1, borderColor: 'red', borderStyle: 'double'});
    return `${prefix}\n${text}`;
};

const formatDebug = (prefix: string, content: string) => {
    const columns = getColumns();
    const wrappedContent = wrap(`${prefix} ${content}`, columns);
    return indentAllExceptFirstLine(wrappedContent);
};

const formatHelp = (prefix: string, content: string) => {
    const text = indentedBox(content, {padding: 1, borderColor: 'blue', borderStyle: 'single'});
    return `${prefix}\n${text}`;
};

export const decorateWithLevel = (level: Level, content: string) => {
    const prefix = `${getDuration()}${getPackageAndFilename(level)}`;
    switch (level) {
        case 'INFO':
            return formatInfo(prefix, content);
        case 'WARN':
            return formatWarn(prefix, content);
        case 'ERROR':
            return formatError(prefix, content);
        case 'DEBUG':
            return formatDebug(prefix, content);
        case 'HELP':
            return formatHelp(prefix, content);
        default:
            return formatInfo(prefix, content);
    }
};
