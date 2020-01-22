// import nicelyFormat from 'nicely-format';
import chalk from 'chalk';
import concordance from 'concordance';
import ansiStyles from 'ansi-styles';
// import stripAnsi from 'strip-ansi';
import { nonBreakingWhitespace } from '../layout';
import { FormatOptions } from './format-unknown';

const forceColor = new chalk.Instance({ level: 3 }); // new chalk.Instance({ level: Math.max(chalk.level, 1) });

const colorTheme = {
    boolean: ansiStyles.yellow,
    circular: forceColor.grey('[Circular]'),
    date: {
        invalid: forceColor.red('invalid'),
        value: ansiStyles.blue
    },
    diffGutters: {
        actual: forceColor.red('-') + ' ',
        expected: forceColor.green('+') + ' ',
        padding: '  '
    },
    error: {
        ctor: { open: ansiStyles.grey.open + '(', close: ')' + ansiStyles.grey.close },
        name: ansiStyles.magenta
    },
    function: {
        name: ansiStyles.blue,
        stringTag: ansiStyles.magenta
    },
    global: ansiStyles.magenta,
    item: { after: forceColor.grey(',') },
    list: { openBracket: forceColor.grey('['), closeBracket: forceColor.grey(']') },
    mapEntry: { after: forceColor.grey(',') },
    maxDepth: forceColor.grey('…'),
    null: ansiStyles.yellow,
    number: ansiStyles.yellow,
    object: {
        openBracket: forceColor.grey('{'),
        closeBracket: forceColor.grey('}'),
        ctor: ansiStyles.magenta,
        stringTag: { open: ansiStyles.magenta.open + '@', close: ansiStyles.magenta.close },
        secondaryStringTag: { open: ansiStyles.grey.open + '@', close: ansiStyles.grey.close }
    },
    property: {
        after: forceColor.grey(','), // SHOULD BE , but includes stupid trailing comma
        keyBracket: { open: forceColor.grey('['), close: forceColor.grey(']') },
        valueFallback: forceColor.grey('…')
    },
    react: {
        functionType: forceColor.grey('\u235F'),
        openTag: {
            start: forceColor.grey('<'),
            end: forceColor.grey('>'),
            selfClose: forceColor.grey('/'),
            selfCloseVoid: ' ' + forceColor.grey('/')
        },
        closeTag: {
            open: forceColor.grey('</'),
            close: forceColor.grey('>')
        },
        tagName: ansiStyles.magenta,
        attribute: {
            separator: '=',
            value: {
                openBracket: forceColor.grey('{'),
                closeBracket: forceColor.grey('}'),
                string: {
                    line: { open: forceColor.blue('"'), close: forceColor.blue('"'), escapeQuote: '"' }
                }
            }
        },
        child: {
            openBracket: forceColor.grey('{'),
            closeBracket: forceColor.grey('}')
        }
    },
    regexp: {
        source: { open: ansiStyles.blue.open + '/', close: '/' + ansiStyles.blue.close },
        flags: ansiStyles.yellow
    },
    stats: { separator: forceColor.grey('---') },
    string: {
        open: ansiStyles.blue.open,
        close: ansiStyles.blue.close,
        line: { open: forceColor.blue("'"), close: forceColor.blue("'") },
        multiline: { start: forceColor.blue('`'), end: forceColor.blue('`') },
        controlPicture: ansiStyles.grey,
        diff: {
            insert: {
                open: ansiStyles.bgGreen.open + ansiStyles.black.open,
                close: ansiStyles.black.close + ansiStyles.bgGreen.close
            },
            delete: {
                open: ansiStyles.bgRed.open + ansiStyles.black.open,
                close: ansiStyles.black.close + ansiStyles.bgRed.close
            },
            equal: ansiStyles.blue,
            insertLine: {
                open: ansiStyles.green.open,
                close: ansiStyles.green.close
            },
            deleteLine: {
                open: ansiStyles.red.open,
                close: ansiStyles.red.close
            }
        }
    },
    symbol: ansiStyles.yellow,
    typedArray: {
        bytes: ansiStyles.yellow
    },
    undefined: ansiStyles.yellow
};

const removeNewLines = (str: string) => str.replace(/\s+/g, ` `);

export const formatObject = <T>(object: T, { args }: FormatOptions) => {
    const str = concordance
        .format(object, { maxDepth: 3, plugins: [], theme: colorTheme })
        .replace(/: /g, `:${nonBreakingWhitespace}`);

    return args.length === 1 ? str : removeNewLines(str);
};
/*{
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
    })*/
