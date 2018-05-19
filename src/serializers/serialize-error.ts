import * as serializeErrorToObject from 'serialize-error';

const cwdRegex = new RegExp(process.cwd(), 'g');

export const serializeError = (err: Error) => {
    const errorObject = serializeErrorToObject(err);
    return {
        ...errorObject,
        message: errorObject.message.replace(cwdRegex, '.'),
        stack: errorObject.stack.replace(cwdRegex, '.')
    };
};
