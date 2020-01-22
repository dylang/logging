import { serializeError } from './serialize-error';

describe('serialize-error', () => {
    test('serializeError', async () => {
        const getError = () => {
            const error = new Error('example-error') as Error & { expando: string };
            error.expando = 'expando-value';
            return error;
        };

        const result = serializeError(getError());
        expect(result).toEqual({
            expando: 'expando-value',
            message: 'example-error',
            name: 'Error',
            stack: expect.stringContaining(
                'Error: example-error\n    at getError (./src/serializers/serialize-error.test.ts'
            )
        });
    });
});
