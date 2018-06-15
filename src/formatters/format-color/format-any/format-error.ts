import {readFileSync, existsSync} from 'fs';
import {codeFrameColumns} from '@babel/code-frame';
import * as serializeErrorToObject from 'serialize-error';
import * as cleanStack from 'clean-stack';
import * as stripIndent from 'strip-indent';
import * as minIndent from 'min-indent';
import chalk from 'chalk';
import isCI from 'is-ci';
import {formatAny} from './format-any';
import {nonBreakingWhitespace} from '../helpers';

const root = process.env.HOME || process.cwd();
const cwdRegex = new RegExp(root, 'gm');
const filenameRegex = new RegExp(`${root}(/[a-zA-Z0-9\._/\-]*):`, 'g');

const getCodeSnippet = (stackLine: string, message: string) => {
    const [at, filename, lineAsString, character] = stackLine
        .replace(/:\s/g, '')
        .replace('(anonymous function)', '')
        .split(/[(:)]/);

    if (!filename) {
        return chalk.gray(stackLine.trim());
    }

    if (!existsSync(filename)) {
        return chalk.gray(stackLine.trim()); // + ` (${filename} not found)`;
    }
    const lineNumber = parseInt(lineAsString, 10) - 1;

    const fileContents = readFileSync(filename, {encoding: 'UTF-8'}).toString() + '//EOF';
    const lines = fileContents.split('\n');
    const linesAbove = !lines[lineNumber - 2] ? 1 : 2;
    const linesBelow = !lines[lineNumber + 2] ? 1 : 2;
    const linesToShow = lines.slice(lineNumber - linesAbove, lineNumber + linesBelow + 1).join('\n');
    const unIndentCount = minIndent(linesToShow);
    const modifiedFileContents = [
        ...lines.slice(0, lineNumber - linesAbove),
        stripIndent(linesToShow),
        ...lines.slice(lineNumber + linesBelow),
    ].join('\n');
    const annotatedCode = codeFrameColumns(
        modifiedFileContents,
        {start: {line: lineNumber + 1, column:  parseInt(character, 10) - unIndentCount}},
        {
            forceColor: true,
            highlightCode: true,
            linesAbove,
            linesBelow,
            message
        }
    );

    return [
        '',
        chalk`{gray ${at.trim()} in }{blue.underline ${isCI ? filename.replace(cwdRegex, '.') : filename}}`,
        annotatedCode.replace(/ /g, nonBreakingWhitespace),
        ''
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
        .map((stackLine: string, index) => getCodeSnippet(stackLine, index === 0 ? message : ''))
        .join('\n');
    const metadataArray = Object.entries(errorMetadata || {});

    const improvedStackArray = [
        chalk.red(`${name}: ${message.replace(cwdRegex, '.')}`),
        '',
        stackWithCodeSnippets,
        metadataArray.length ? ' ' : '',
        metadataArray.map(([key, value]) => chalk`{gray ${key}}: ${formatAny(value)}`).join('\n'),
    ];

    return improvedStackArray
        .join('\n')
        .replace(/\n\n\n/g, '\n\n')
        .replace(filenameRegex, (_, relativePath) => chalk`{blue .${relativePath}}:`);
};
