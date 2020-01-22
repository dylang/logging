import is from '@sindresorhus/is';
import { joinStringsWithNewlinesOrSpaces, nonBreakingWhitespace, stripIndent } from '../layout';
import { LogMessage } from '../log-message';
import { formatUnknown } from './format-unknown';

const getEverythingElse = ({
    duration,
    callee,
    level,
    data,
    hostname,
    pid,
    time,
    v,
    type,
    ...everythingElse
}: LogMessage) => everythingElse;

export const formatContents = (logMessage: LogMessage) => {
    const everythingElse = getEverythingElse(logMessage);
    const contents = [...(logMessage.data || []), ...(is.emptyObject(everythingElse) ? [] : [everythingElse])];

    const formattedMessages = contents
        .filter((arg: unknown) => arg !== '')
        .map((arg: unknown) => formatUnknown(arg, { args: contents }));
    const contentJoined = joinStringsWithNewlinesOrSpaces(formattedMessages);
    return stripIndent`${contentJoined}`.replace(/ /g, nonBreakingWhitespace);
};
