import {decorateWithLevel} from './decorate-with-level';

jest.mock('../../../config', () => ({
    getColumns: () => 80,
    getColumnsWithBoxen: () => 90,
    logConfig: {indent: 8}
}));
jest.mock('../prefix', () => ({
    getPackageAndFilename: () => 'mock-package/mock-filename',
    getDuration: () => 'mock-duration'
}));

describe('decorate-with-level', () => {
    test('info', async () => {
        const result = decorateWithLevel('INFO', 'content1234567890'.repeat(10));
        expect(result).toMatchSnapshot();
    });

    test('warn', async () => {
        const result = decorateWithLevel('WARN', 'content1234567890'.repeat(10));
        expect(result).toMatchSnapshot();
    });

    test('error', async () => {
        const result = decorateWithLevel('ERROR', 'content1234567890'.repeat(10));
        expect(result).toMatchSnapshot();
    });

    test('debug', async () => {
        const result = decorateWithLevel('DEBUG', 'content1234567890'.repeat(10));
        expect(result).toMatchSnapshot();
    });

    test('help', async () => {
        const result = decorateWithLevel('HELP', 'content1234567890'.repeat(10));
        expect(result).toMatchSnapshot();
    });
});
