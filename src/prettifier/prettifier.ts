import { logConfig } from '../config';
import { formatLevel } from './format-level';
import { dynamicProgress } from './dynamic-progress';
import { nonBreakingWhitespace } from './layout';
import { LogMessage } from './log-message';

const replaceNonBreakingWhitespaceWithSpace = (str?: string) =>
    str ? str.replace(new RegExp(nonBreakingWhitespace, 'g'), ' ') : '';

export const prettifier = () => (logMessage: LogMessage) => {
    const result = formatLevel(logMessage);
    if (result) {
        dynamicProgress.hide();
        logConfig.destination.write(replaceNonBreakingWhitespaceWithSpace(result));
        logConfig.destination.write('\n');
        dynamicProgress.show();
    }
};
