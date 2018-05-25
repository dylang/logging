import * as timeSpan from 'time-span';
import {getDuration} from './get-duration';

jest.mock('../../../config', () => ({
    logConfig: ({
        indent: 8
    })
}));
jest.mock('chalk', () => ({
    default: String.raw
}));
jest.mock('time-span', () => jest.fn().mockReturnValue(() => 1000000));

describe('get-duration', () => {
    test('getDuration', async () => {
        const result = getDuration();
        expect(result).toEqual('{gray 16m 40s }');
    });

    test('getDuration with value passed in', async () => {
        const startDur: any = () => 20000;
        const result = getDuration(startDur as timeSpan.TimeSpanObject);
        expect(result).toEqual('{gray     20s }');
    });

    test('getDuration with less than one second', async () => {
        const startDur: any = () => 200;
        const result = getDuration(startDur as timeSpan.TimeSpanObject);
        expect(result).toEqual('{gray       · }');
    });
});
