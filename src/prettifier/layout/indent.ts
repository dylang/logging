import { logConfig } from '../../config';
import stripAnsi from 'strip-ansi';

export const indentAllLines = (str: string, label?: string) =>
    str
        .split('\n')
        .map(
            (str, index) =>
                (index === 2 && label
                    ? '    ' + label + ' '.repeat(logConfig.indent - stripAnsi(label).length - 4)
                    : ' '.repeat(logConfig.indent)) + str
        )
        .join('\n');
