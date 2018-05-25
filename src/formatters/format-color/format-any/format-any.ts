import * as nicelyFormat from 'nicely-format';
import is from '@sindresorhus/is';
import {serializeError} from '../../../serializers';
import chalk from 'chalk';
import {nonBreakingWhitespace} from '../helpers';

const formatObject = (object: object) => nicelyFormat(object, {
    highlight: true,
    min: true,
    theme: {
        tag: 'cyan',
        content: 'reset',
        prop: 'yellow',
        value: 'green',
        number: 'green',
        string: 'reset',
        date: 'green',
        symbol: 'red',
        regex: 'red',
        function: 'blue',
        error: 'red',
        boolean: 'yellow',
        label: 'blue',
        bracket: 'grey',
        comma: 'grey',
        misc: 'grey',
        key: 'cyan'
    }
}).replace(/: /g, `:${nonBreakingWhitespace}`);

export const formatAny = (arg: any): string => {
    if (is.string(arg)) {
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
        const errorObject = serializeError(arg);
        const {
            name,
            message,
            stack,
            ...errorMetadata
        } = errorObject;
        const metadataArray = Object.entries(errorMetadata || {});
        return [
            chalk.red.bold(`${name}: ${message}`),
            ' ',
            stack.replace(`${name}: ${message}\n`, ''),
            metadataArray.length ? ' ' : '',
            metadataArray.map(([key, value]) => `${key}: ${formatObject(value)}`).join('\n'),
        ].filter(Boolean).join('\n');
    }
    return formatObject(arg);
};