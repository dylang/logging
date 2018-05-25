import {logConfig} from '../../../config';

export const indentAllExceptFirstLine = (str: string) => str.replace(/\n/g, `\n${' '.repeat(logConfig.indent)}`);
export const indentAllLines = (str: string) => ' '.repeat(logConfig.indent) + indentAllExceptFirstLine(str);
