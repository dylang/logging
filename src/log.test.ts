import stripAnsi from 'strip-ansi';
import { logger } from './logger';

jest.mock('./streams', () => ({
    streamStdout: (x: string) => x
}));

describe('Log', () => {
    test('info', async () => {
        const results = logger.debug('a', 'b');
        expect(stripAnsi(results)).toMatchSnapshot();
    });

    test('warn', async () => {
        const results = logger.warn('a', 'b');
        expect(stripAnsi(results)).toMatchSnapshot();
    });

    test('error', async () => {
        const results = logger.error('a', 'b');
        expect(stripAnsi(results)).toMatchSnapshot();
    });

    test('debug', async () => {
        const results = logger.debug('a', 'b');
        expect(stripAnsi(results)).toMatchSnapshot();
    });
});
