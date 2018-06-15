import {formatColor} from './format-color';

jest.mock('./format-any', () => ({formatAny: (x: string) => x}));
jest.mock('./color-formatters', () => ({
    decorateWithLevel: (a: any, b: string) => `${a} ${b}`
}));

describe('format-color.test', () => {
    test('formatColor', async () => {
        const result = formatColor('INFO', ['arg1', 'arg2', 'arg3']);
        expect(result).toEqual('INFO arg1 arg2 arg3');
    });

    test('formatColor with new lines', async () => {
        const result = formatColor('INFO', ['arg1\nnew-line', 'arg2', 'arg3']);
        // tslint:disable-next-line:prefer-template
        expect(result).toEqual('INFO arg1\n' +
            'new-line \n' +
            'arg2 arg3');
    });
});
