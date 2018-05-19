import * as path from 'path';
import * as pkgDir from 'pkg-dir';
import chalk from 'chalk';

interface CallSite {
    getFileName(): string;
}

const originalPrepareStackTrace = Error.prepareStackTrace;
const cwd = process.cwd();
const permittedCharacters = 60;

export const getFilename = () => {
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
    const remainder = permittedCharacters - packageName.length - (packageName.length ? 1 : 0);
    const shortenedName = `${chalk.hex('5b7b8c')(packageName)}${shortenedFileName ? chalk.gray('/') : ''}${chalk.hex('73c1bf')(shortenedFileName.substr(0, remainder))}`;
    return {
        packageName,
        relativeFilename,
        shortenedName
    };
};
