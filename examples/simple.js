// Yarn run example
import logging from '../src';

const log = logging('Feature');

const details = { blah: true };
const error = new Error('This error is part of the example');
const context = { userid: 1 };
const etc = false;

log.debug('set DEBUG=Feature or DEBUG=* to see this one');
log.info('Interesting');
log.warn('Hmmm...', 123, false, { details });
log.error('Not good.', 'Not good at all.', { err: error }, { context }, { etc });
log.info('This\nwill\nspan\nmultiple\nlines.');

const object = { property: {} };
object.circularReference = object;
object[Symbol('foo')] = 'foo';
object.map = new Map();
object.map.set('prop', 'value');
object.array = [ 1, Number.NaN, Number.POSITIVE_INFINITY ];

log.info(object);
