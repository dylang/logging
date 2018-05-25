import babelCodeFrame  = require('babel-code-frame');

export const formatLine = (fileName: string, failureString: string, line: number, character: number): string => {
    const outputLines: string[] = [];
    outputLines.push('');
    outputLines.push(fileName);
    const frame = babelCodeFrame(
        'const foo = \'bar\';',
        line + 1, // Babel-code-frame is 1 index
        character,
        {
            forceColor: true,
            highlightCode: true,
        }
    );

    // Ouput
    outputLines.push(`${failureString}`);
    outputLines.push(frame);
    outputLines.push('');
    return `${outputLines.join('\n')}\n`;
};
