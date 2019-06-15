import nicelyFormat from 'nicely-format';
import { nonBreakingWhitespace } from '../helpers';

export const formatObject = (object: object) =>
    nicelyFormat(object, {
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
