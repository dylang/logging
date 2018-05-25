import chalk from 'chalk';
import {getCallee} from './get-callee';

export const getPackageAndFilename = (level: Level) => {
    const {packageName, shortenedFileName, relativeFilename} = getCallee();
    switch (level) {
        case 'WARN':
            return chalk`{gray [}{hex('f3f99d') ${packageName}}${relativeFilename ? chalk`{gray /}{hex('f3f99d').bold ${relativeFilename}}` : ''}{gray ]}`;
        case 'ERROR':
            return chalk`{gray [}{hex('ff5c57') ${packageName}}${relativeFilename ? chalk`{gray /}{hex('ff5c57').bold ${relativeFilename}}` : ''}{gray ]}`;
        case 'DEBUG':
            return chalk`{gray [}{hex('5b7b8c') ${packageName}}${shortenedFileName ? chalk`{gray /}{green ${shortenedFileName}}` : ''}{gray ]}`;
        default:
            return chalk`{gray [}{hex('5b7b8c') ${packageName}}${shortenedFileName ? chalk`{gray /}{hex('73c1bf') ${shortenedFileName}}` : ''}{gray ]}`;
    }
};
