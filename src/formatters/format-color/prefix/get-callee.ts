import path from 'path';
import pkgDir from 'pkg-dir';

interface CallSite {
    getFileName(): string;
}

const originalPrepareStackTrace = Error.prepareStackTrace;

// DEBUG will show full file path for all messages
export const getCallee = () => {
    Error.prepareStackTrace = (_, rawStack: any) => rawStack;
    const stack = new Error().stack as any as CallSite[];
    Error.prepareStackTrace = originalPrepareStackTrace;

    const callers = stack.map((callsite: CallSite) => {
        return callsite.getFileName();
    });

    const filePath = callers.find((x: string) => !x.includes('logging/lib')) || '';
    const packageDir = pkgDir.sync(filePath) || '';
    const packageName = path.basename(packageDir);
    const shortenedFileName = filePath.includes('node_modules')
        ? ''
        : filePath
            .replace(/\..sx?$/, '')
            .replace(/\/index$/, '')
            .split('/')
            .reverse()[0];

    const relativeFilename = path.relative(packageDir, filePath);
    return {
        packageName,
        relativeFilename,
        shortenedFileName
    };
};
