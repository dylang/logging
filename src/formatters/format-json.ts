import {inspect} from 'util';
import is from '@sindresorhus/is';
import {LEVEL} from '../types';
import {serializeError} from '../serializers';
import {globalState} from '../global-state';

export const formatJson = (level: LEVEL, args: any[]) => {
    const error = args.find(arg => is.error(arg));
    const arrayOfObjects = args.filter(arg => is.plainObject(arg));
    const objects = Object.assign({}, ...arrayOfObjects);
    const msg = args
        .filter(arg => !(is.error(arg) || is.plainObject(arg)))
        .map(arg => is.primitive(arg) ? arg : inspect(arg))
        .join(' ');
    const output = {
        ...globalState.getMetadata(),
        level,
        ...msg ? {msg} : null,
        ...objects,
        ...error ? {error: serializeError(error)} : null
    };
    return JSON.stringify(output);
};
