import {writeStdOut} from './write-stdout';

console.log = jest.fn();

describe('write-stdout', () => {
    test('writeStdOut color', async () => {
        writeStdOut('test');
        expect(console.log).toHaveBeenCalledWith('test');
    });

});
