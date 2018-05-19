import {streamStdout} from './stream-stdout';

console.log = jest.fn();

describe('write-stdout', () => {
    test('writeStdOut color', async () => {
        streamStdout('test');
        expect(console.log).toHaveBeenCalledWith('fobar');
    });

});
