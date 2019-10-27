import { logger } from '../lib';

const typescriptExample = () => {
    logger.info('starting example', '\nI will be on a new line!');
    logger.warn('today is', new Date());
    logger.error(new Error('this was an error'));
};

typescriptExample();
