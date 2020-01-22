import chalk from 'chalk';
import stripAnsi from 'strip-ansi';
import { stripIndent } from 'common-tags';
import { formatUnknown } from './format-unknown';

jest.mock('./format-error', () => ({ formatError: (err: Error) => err.message }));
jest.mock('../layout', () => ({
    nonBreakingWhitespace: '<nbsp>'
}));

jest.mock('../../serializers', () => ({
    serializeError: () => ({
        name: 'Error',
        message: 'mock error',
        stack: 'Error: mock error\nmock-stack',
        mock: 'mock-data'
    })
}));

chalk.level = 0;

describe('format-any', () => {
    test('string', () => {
        const result = formatUnknown('string', { args: ['string'] });
        expect(result).toEqual('string');
    });
    test('error', () => {
        const result = formatUnknown(new Error('example error'), { args: ['string'] });
        expect(result).toEqual('example error');
    });
    test('object', () => {
        const result = formatUnknown({ a: 'b', c: [1, '2'] }, { args: ['string'] });
        expect(stripAnsi(result)).toEqual(stripIndent`
        {
          a:<nbsp>'b',
          c:<nbsp>[
            1,
            '2',
          ],
        }
        `);
    });
    test('null', () => {
        const result = formatUnknown(null, { args: [null] });
        expect(stripAnsi(result)).toEqual('null');
    });
    test('undefined', () => {
        const result = formatUnknown(undefined, { args: [undefined] });
        expect(stripAnsi(result)).toEqual('undefined');
    });
});
