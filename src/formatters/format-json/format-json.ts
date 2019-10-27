import { inspect } from 'util';
import is from '@sindresorhus/is';
import groupBy from 'lodash.groupby';
import { serializeError } from '../../serializers';
import { logConfig } from '../../config';

export const formatJson = (level: Level, args: unknown[]) => {
    const { errors, arrayOfObjects, everythingElse } = groupBy<unknown>(args, (arg: unknown) =>
        is.error(arg) ? 'errors' : is.plainObject(arg) ? 'arrayOfObjects' : 'everythingElse'
    );
    const objects = Object.assign({}, ...arrayOfObjects);
    const msg = everythingElse.map((arg: unknown) => (is.primitive(arg) ? arg : inspect(arg))).join(' ');

    const output = {
        level,
        ...logConfig.jsonMetadata,
        ...(msg ? { msg } : undefined),
        ...objects,
        ...(errors ? { error: serializeError(errors[0]) } : undefined)
    };
    return JSON.stringify(output);
};
