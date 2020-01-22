import chalk from 'chalk';
import { prettifier } from './prettifier';
import { LogMessage } from './log-message';
import { logConfig } from '../config';

jest.mock('../config', () => ({
    getColumns: () => 80,
    logConfig: {
        destination: {
            write: jest.fn()
        }
    }
}));
jest.mock('./dynamic-progress', () => ({
    dynamicProgress: {
        hide: jest.fn(),
        show: jest.fn()
    }
}));

const logMessage: LogMessage = {
    level: 30,
    time: 111111,
    v: 1,
    pid: 123,
    hostname: 'hostname',
    duration: 555,
    callee: {
        packageName: 'mock-package-name',
        relativeFilename: 'mock-relative-filename',
        shortenedFileName: 'mock-shortened-filename'
    }
};

const { destination } = logConfig;
chalk.level = 0;

describe('format-color.test', () => {
    beforeEach(() => jest.clearAllMocks());

    test('formatColor', async () => {
        prettifier()({ ...logMessage, type: 'INFO', data: ['arg1', 'arg2', 'arg3'] });
        expect(destination.write).toHaveBeenNthCalledWith(
            1,
            '7:01:51 PM EST · [mock-package-name/mock-shortened-filename] arg1 arg2 arg3'
        );
        expect(destination.write).toHaveBeenNthCalledWith(2, '\n');
    });

    test('formatColor with new lines', async () => {
        prettifier()({ ...logMessage, type: 'INFO', data: ['arg1\nnew-line', 'arg2', 'arg3'] });
        // tslint:disable-next-line:prefer-template
        expect(destination.write).toHaveBeenNthCalledWith(
            1,
            '7:01:51 PM EST · [mock-package-name/mock-shortened-filename] arg1\n' + 'new-line \n' + 'arg2 arg3'
        );
        expect(destination.write).toHaveBeenNthCalledWith(2, '\n');
    });
});
