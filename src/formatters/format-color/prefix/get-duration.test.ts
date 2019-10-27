import timeSpan from 'time-span';
import { getDuration } from './get-duration';

jest.mock('../../../config', () => ({
    logConfig: {
        indent: 8
    }
}));
jest.mock('chalk', () => String.raw);
jest.mock('time-span', () => jest.fn().mockReturnValue(() => 1000000));

describe('get-duration', () => {
    test('getDuration', async () => {
        const result = getDuration('WARN');
        expect(result).toEqual('{bgMagenta.white }{gray  16 min }');
    });

    test('getDuration with value passed in', async () => {
        const startDur = () => 20000;
        const result = getDuration('PROGRESS', startDur as timeSpan.TimeEndFunction);
        expect(result).toEqual('{bgMagenta.white }{gray     20s }');
    });

    test('getDuration with less than one second', async () => {
        const startDur = () => 200;
        const result = getDuration('INFO', startDur as timeSpan.TimeEndFunction);
        expect(result).toEqual('{bgMagenta.white }{gray       · }');
    });
});
