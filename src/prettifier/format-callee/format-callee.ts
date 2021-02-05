import chalk from 'chalk';
import { LogMessage } from '../log-message';

export const formatCallee = (logMessage: LogMessage, name?: string) => {
    const {
        level,
        callee: { packageName, shortenedFileName, relativeFilename }
    } = logMessage;

    /*
    const levels = {
        10: 'trace',
        20: 'debug',
        30: 'info',
        40: 'warn',
        50: 'error',
        60: 'fatal'
    };
     */

    //case 'ERROR':
    if (level >= 50) {
        return chalk`{gray [}{hex('ff5c57').bold ${packageName}}${
            relativeFilename ? chalk`{gray /}{hex('ff5c57') ${relativeFilename}}` : ''
        }{gray ]}`;
    }

    if (level >= 40) {
        //case 'WARN':
        return chalk`{gray [}{hex('f3f99d').bold ${packageName}}${
            relativeFilename ? chalk`{gray /}{hex('f3f99d') ${relativeFilename}}` : ''
        }{gray ]}`;
    }

    if (level <= 29) {
        // case 'DEBUG':
        return chalk`{gray [}{hex('5b7b8c') ${packageName}}${
            shortenedFileName ? chalk`{gray /}{hex('73c1bf') ${relativeFilename}}` : ''
        }{gray ]}`;
    }

    return chalk`{gray [}{hex('5b7b8c') ${packageName}}${
        shortenedFileName ? chalk`{gray /}{hex('73c1bf') ${shortenedFileName}}` : ''
    }${name ? chalk` {bold name}` : ''}{gray ]}`;
};
