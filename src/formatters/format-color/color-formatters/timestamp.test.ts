import {timestamp} from './timestamp';

describe('timestamp', () => {
    test('timestamp', async () => {
        const result = timestamp();
        expect(result).toEqual(expect.stringMatching(/\d\d:\d\d:\d\d\.\d\d\d?/));
    });
});
