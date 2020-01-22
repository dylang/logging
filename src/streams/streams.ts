import { dynamicProgress } from '../prettifier/dynamic-progress';
import { logConfig } from '../config';
import { Readable } from 'stream';

export const hideProgressThenWriteStream = (buffer: Buffer) => {
    dynamicProgress.hide();
    logConfig.destination.write('vvvvvvvv\n');
    logConfig.destination.write(buffer.toString());
    logConfig.destination.write('\n');
    logConfig.destination.write('^^^^^^^^\n');
    dynamicProgress.show();
};

export const progressFriendlyStream = ({ stdout, stderr }: { stdout: Readable; stderr: Readable }) => {
    stdout.on('data', hideProgressThenWriteStream);
    stderr.on('data', hideProgressThenWriteStream);
};
