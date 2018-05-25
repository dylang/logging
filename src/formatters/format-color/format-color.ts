import is from '@sindresorhus/is';
import {decorateWithLevel} from './color-formatters';
import {formatAny} from './format-any';
import {dynamicProgress} from './dynamic-progress';
import {indentAllLines, joinStringsWithNewlinesOrSpaces, stripIndent} from './helpers';
import {format} from 'util';

export const formatColor = (level: Level, args: any[]) => {
    if (is.string(args[0]) && is.string(args[1]) && args[0].includes('%s')) {
        const [template, ...params] = args;
        return indentAllLines(format(template, ...params));
    }
    const formattedMessages = args
        .filter((arg: any) => arg !== '')
        .map((arg: any) => formatAny(arg));
    const contentJoined = joinStringsWithNewlinesOrSpaces(formattedMessages);
    const contentWithoutExcessIndentation = stripIndent`${contentJoined}`;
    dynamicProgress.clear();
    return decorateWithLevel(level, contentWithoutExcessIndentation);
};
