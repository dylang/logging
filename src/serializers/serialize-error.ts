import * as serializeErrorToObject from 'serialize-error';
import * as cleanStack from 'clean-stack';

const cwdRegex = new RegExp(process.cwd(), 'g');

export const serializeError = (err: Error) => {
    const errorObject = serializeErrorToObject(err);
    return {
        ...errorObject,
        message: errorObject.message.replace(cwdRegex, '.'),
        stack: cleanStack(errorObject.stack).replace(cwdRegex, '.')
    };
};
