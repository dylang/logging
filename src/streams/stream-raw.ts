import {dynamicProgress} from '../formatters/format-color';

export const streamRaw = (message: string) => {
    dynamicProgress.clear();
    process.stdout.write(message);
};
