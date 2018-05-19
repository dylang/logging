import {streamStdout} from './streams';
import {LEVEL} from './types';
import {Log} from './Log';

jest.mock('./streams');

describe('Log', () => {
    test('debug', async () => {
        const log = new Log();
        log.debug('a', 'b');
        expect(streamStdout).toHaveBeenCalledWith(LEVEL.DEBUG, ['a', 'b']);
    });

    test('info', async () => {
        const log = new Log();
        log.info('a', 'b');
        expect(streamStdout).toHaveBeenCalledWith(LEVEL.INFO, ['a', 'b']);
    });

    test('warn', async () => {
        const log = new Log();
        log.warn('a', 'b');
        expect(streamStdout).toHaveBeenCalledWith(LEVEL.WARN, ['a', 'b']);
    });

    test('error', async () => {
        const log = new Log();
        log.error('a', 'b');
        expect(streamStdout).toHaveBeenCalledWith(LEVEL.ERROR, ['a', 'b']);
    });

});
