import * as stripAnsi from 'strip-ansi';
import {formatAny} from './format-any';

jest.mock('../helpers', () => ({
    nonBreakingWhitespace: '<nbsp>'
}));

jest.mock('../../../serializers', () => ({
    serializeError: () => ({
        name: 'Error',
        message: 'mock error',
        stack: 'Error: mock error\nmock-stack',
        mock: 'mock-data'
    })
}));

describe('format-any', () => {
    test('string', () => {
        const result = formatAny('string');
        expect(result).toEqual('string');
    });
    test('error', () => {
        const result = formatAny(new Error('example error'));
        expect(stripAnsi(result)).toEqual(
        'Error: mock error\n'
        + ' \n'
        + 'mock-stack\n'
        + ' \n'
        + 'mock: "mock-data"'
        );
    });
    test('object', () => {
        const result = formatAny({a: 'b', c: [1, '2']});
        expect(stripAnsi(result)).toEqual('{a:<nbsp>"b", c:<nbsp>[1, "2"]}');
    });
    test('null', () => {
        const result = formatAny(null);
        expect(stripAnsi(result)).toEqual('null');
    });
    test('undefined', () => {
        const result = formatAny(undefined);
        expect(stripAnsi(result)).toEqual('undefined');
    });
});