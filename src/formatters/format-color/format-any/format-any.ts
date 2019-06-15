import is from '@sindresorhus/is';
import chalk from 'chalk';
import { formatError } from './format-error';
import { formatObject } from './format-object';

export const formatAny = (arg: any): string => {
    if (is.string(arg)) {
        // Weak sauce for deciding this is an error stack
        if (arg.includes('    at ')) {
            const [errorMessage] = arg.split(/\s+at\s/);
            const testError = new Error(errorMessage);
            testError.stack = arg.replace(errorMessage, '').trim();
            return formatError(testError);
        }

        // This hack lets chalk template our strings, like '{blue i am blue}'
        const array = [arg] as any;
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
        return formatError(arg);
    }
    return formatObject(arg);
};
