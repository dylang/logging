import * as path from 'path';
import * as pkgDir from 'pkg-dir';

interface CallSite {
    getFileName(): string;
}

const originalPrepareStackTrace = Error.prepareStackTrace;
const cwd = process.cwd();

// DEBUG will show full file path for all messages
export const getCallee = () => {
    Error.prepareStackTrace = (error: any, rawStack: any) => rawStack;
    const stack = new Error().stack as any as CallSite[];
    Error.prepareStackTrace = originalPrepareStackTrace;

    const callers = stack.map((callsite: CallSite) => {
        return callsite.getFileName();
    });

    const filePath = callers.find((x: string) => !x.includes('logging/lib')) || '';
    const packageName = path.basename(pkgDir.sync(filePath) || '');
    const shortenedFileName = filePath.includes('node_modules')
        ? ''
        : filePath
            .replace(/\..sx?$/, '')
            .replace(/\/index$/, '')
            .split('/')
            .reverse()[0];

    const relativeFilename = path.relative(cwd, filePath);
    return {
        packageName,
        relativeFilename,
        shortenedFileName
    };
};
