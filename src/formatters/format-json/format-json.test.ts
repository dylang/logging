import {formatJson} from './format-json';

describe('format-json', () => {
    test('formatJson', async () => {
        const result = formatJson('INFO', ['string', ['array'], {object: true}, 'string', {object2: 'two'}]);

        expect(JSON.parse(result)).toEqual({
            level: 'INFO',
            msg: 'string [ \'array\' ] string',
            object: true,
            object2: 'two'
        });
    });
});
