import {LEVEL} from '../../types';
import {formatColor} from './format-color';

jest.mock('./timestamp', () => ({timestamp: () => 'mock-time'}));
jest.mock('chalk', () => ({
    default: ({
        gray: (x: string) => x
    })
}));
jest.mock('./format-any', () => ({formatAny: (x: string) => x}));
jest.mock('./decorate-with-level', () => ({
    decorateWithLevel: (a: any, b: string, c: string) => `${a} ${b} ${c}`
}));

describe('format-color.test', () => {
    test('formatColor', async () => {
        const result = formatColor(LEVEL.INFO, ['arg1', 'arg2', 'arg3']);
        expect(result).toEqual('mock-time 0 label arg1 arg2 arg3');
    });

    test('formatColor with new lines', async () => {
        const result = formatColor(LEVEL.INFO, ['arg1\nnew-line', 'arg2', 'arg3']);
        expect(result).toEqual('mock-time 0 label arg1\nnew-line\narg2 arg3');
    });
});
