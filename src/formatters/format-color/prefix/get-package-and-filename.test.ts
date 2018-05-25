import {getPackageAndFilename} from './get-package-and-filename';

jest.mock('./get-callee', () => ({
    getCallee: () => ({
        packageName: 'mock-package',
        shortenedFileName: 'mock-name',
        relativeFilename: '/mock/filename'
    })
}));
jest.mock('chalk', () => ({default: String.raw}));

describe('get-prefix', () => {
    test('getPrefix warn', async () => {
        const result = getPackageAndFilename('WARN');
        expect(result).toEqual('{gray [}{hex(\'f3f99d\') mock-package}{gray /}{hex(\'f3f99d\').bold /mock/filename}{gray ]}');
    });
    test('getPrefix error', async () => {
        const result = getPackageAndFilename('ERROR');
        expect(result).toEqual('{gray [}{hex(\'ff5c57\') mock-package}{gray /}{hex(\'ff5c57\').bold /mock/filename}{gray ]}');
    });
    test('getPrefix debug', async () => {
        const result = getPackageAndFilename('DEBUG');
        expect(result).toEqual('{gray [}{hex(\'5b7b8c\') mock-package}{gray /}{green mock-name}{gray ]}');
    });
    test('getPrefix info', async () => {
        const result = getPackageAndFilename('INFO');
        expect(result).toEqual('{gray [}{hex(\'5b7b8c\') mock-package}{gray /}{hex(\'73c1bf\') mock-name}{gray ]}');
    });
});
