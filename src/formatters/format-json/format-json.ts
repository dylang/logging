import {inspect} from 'util';
import is from '@sindresorhus/is';
import groupBy from 'lodash.groupby';
import {serializeError} from '../../serializers';
import {logConfig} from '../../config';

export const formatJson = (level: Level, args: any[]) => {
    const {errors, arrayOfObjects, everythingElse} = groupBy(args, (arg: any) => is.error(arg) ? 'errors' : is.plainObject(arg) ? 'arrayOfObjects' : 'everythingElse');
    const objects = Object.assign({}, ...arrayOfObjects);
    const msg = everythingElse
        .map((arg: any) => is.primitive(arg) ? arg : inspect(arg))
        .join(' ');

    const output = {
        level,
        ...logConfig.jsonMetadata,
        ...msg ? {msg} : null,
        ...objects,
        ...errors ? {error: serializeError(errors[0])} : null
    };
    return JSON.stringify(output);
};
