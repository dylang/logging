import is from '@sindresorhus/is';
import { decorateWithLevel } from './color-formatters';
import { formatAny } from './format-any';
import { dynamicProgress } from './dynamic-progress';
import { indentAllLines, joinStringsWithNewlinesOrSpaces, stripIndent, nonBreakingWhitespace } from './helpers';
import { format } from 'util';

const replaceNonBreakingWhitespaceWithSpace = (str: string) => str.replace(new RegExp(nonBreakingWhitespace, 'g'), ' ');

export const formatColor = (level: Level, args: any[]) => {
    if (is.string(args[0]) && is.string(args[1]) && args[0].includes('%s')) {
        const [template, ...params] = args;
        return indentAllLines(format(template, ...params));
    }
    const formattedMessages = args.filter((arg: any) => arg !== '').map((arg: any) => formatAny(arg));
    const contentJoined = joinStringsWithNewlinesOrSpaces(formattedMessages);
    const contentWithoutExcessIndentation = stripIndent`${contentJoined}`.replace(/ /g, nonBreakingWhitespace);
    dynamicProgress.clear();
    return replaceNonBreakingWhitespaceWithSpace(decorateWithLevel(level, contentWithoutExcessIndentation));
};
