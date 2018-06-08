import {readFileSync, existsSync} from 'fs';
import {codeFrameColumns} from '@babel/code-frame';
import * as serializeErrorToObject from 'serialize-error';
import * as cleanStack from 'clean-stack';
import chalk from 'chalk';
import isCI from 'is-ci';
import {formatObject} from './format-object';
import {nonBreakingWhitespace} from '../helpers';

const cwdRegex = new RegExp(process.cwd(), 'g');

const getCodeSnippet = (stackLine: string) => {
    const [, filename, line, character] = stackLine.replace(/:\s/g, '').split(/[(:)]/);

    if (!filename) {
        return stackLine;
    }

    if (!existsSync(filename)) {
        return stackLine;
    }

    const fileContents = readFileSync(filename, {encoding: 'UTF-8'}).toString();
    const annotatedCode = codeFrameColumns(
        fileContents,
        {start: {line: parseInt(line, 10), column:  parseInt(character, 10)}},
        {
            forceColor: true,
            highlightCode: true,
        }
    );

    return [
        chalk.underline(isCI ? filename.replace(cwdRegex, '.') : filename),
        annotatedCode.replace(/ /g, nonBreakingWhitespace)
    ].join('\n');

};

export const formatError = (err: Error): string => {
    const {
        name,
        message,
        stack,
        ...errorMetadata
    } = serializeErrorToObject(err);
    const cleanedStack = cleanStack(stack)
        .replace(`${name}: ${message}\n`, '');

    const stackWithCodeSnippets = cleanedStack.split('\n')
        .map((stackLine: string) => getCodeSnippet(stackLine))
        .join('\n\n');
    const metadataArray = Object.entries(errorMetadata || {});

    return [
        chalk.red.bold(`${name}: ${message.replace(cwdRegex, '.')}`),
        stackWithCodeSnippets,
        metadataArray.length ? ' ' : '',
        metadataArray.map(([key, value]) => `${key}: ${formatObject(value)}`).join('\n'),
    ].filter(Boolean).join('\n');
};
