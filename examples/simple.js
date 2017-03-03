// yarn run example
import logging from '../src';

const log = logging('Feature');

const details = { blah: true };
const err = new Error('This error is part of the example');
const context = { userid: 1 };
const etc = false;

log.debug('set DEBUG=Feature or DEBUG=* to see this one');
log.info('Interesting');
log.warn('Hmmm...', 123, false, { details });
log.error('Not good.', 'Not good at all.', { err }, { context }, { etc });
log.info('This\nwill\nspan\nmultiple\nlines.');

const obj = { property: {} };
obj.circularReference = obj;
obj[Symbol('foo')] = 'foo';
obj.map = new Map();
obj.map.set('prop', 'value');
obj.array = [ 1, NaN, Infinity ];

log.info(obj);
