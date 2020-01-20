import stripAnsi from 'strip-ansi';

export const rightJustify = (str: string, length: number) =>
    `${' '.repeat(Math.max(length - stripAnsi(str).length, 0))}${str}`;
