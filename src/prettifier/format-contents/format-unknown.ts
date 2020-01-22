import is from '@sindresorhus/is';
import chalk from 'chalk';
import { formatError } from './format-error';
import { formatObject } from './format-object';

interface TemplateStringsArray extends Array<string> {
    raw: string[];
}

export interface FormatOptions {
    args: unknown[];
}

export const formatUnknown = (arg: unknown, formatOptions: FormatOptions): string => {
    if (is.string(arg)) {
        // Weak sauce for deciding this is an error stack
        if (arg.includes('    at ')) {
            const [errorMessage] = arg.split(/\s+at\s/);
            const testError = new Error(errorMessage);
            testError.stack = arg.replace(errorMessage, '').trim();
            return formatError(testError, formatOptions);
        }

        // This hack lets chalk template our strings, like '{blue i am blue}'
        const array = [arg] as TemplateStringsArray;
        array.raw = [arg.replace(/\\/g, '\\\\')];
        try {
            return chalk(array);
        } catch {
            // If chalk has errors just return original
        }
        return arg;
    }

    if (is.promise(arg)) {
        return chalk`{blue [Promise]}`;
    }

    if (is.error(arg)) {
        return formatError(arg, formatOptions);
    }

    if (is.generator(arg) || is.generatorFunction(arg)) {
        return chalk`{blue [Generator]}`;
    }
    return formatObject(arg, formatOptions);
};
