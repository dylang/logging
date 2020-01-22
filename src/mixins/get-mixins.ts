import { getDuration } from './duration';
import { getCallee } from './callee';

export const getMixins = () => {
    const duration = getDuration();
    const callee = getCallee();
    return {
        duration,
        callee
    };
};
