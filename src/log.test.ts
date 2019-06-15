import stripAnsi from 'strip-ansi';
import { log } from './log';

jest.mock('./streams', () => ({
    streamStdout: (x: string) => x
}));

describe('Log', () => {
    test('info', async () => {
        const results = log.debug('a', 'b');
        expect(stripAnsi(results)).toMatchSnapshot();
    });

    test('warn', async () => {
        const results = log.warn('a', 'b');
        expect(stripAnsi(results)).toMatchSnapshot();
    });

    test('error', async () => {
        const results = log.error('a', 'b');
        expect(stripAnsi(results)).toMatchSnapshot();
    });

    test('debug', async () => {
        const results = log.debug('a', 'b');
        expect(stripAnsi(results)).toMatchSnapshot();
    });
});
