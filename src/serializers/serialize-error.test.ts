import { serializeError } from './serialize-error';

describe('serialize-error', () => {
    test('serializeError', async () => {
        const error = new Error('example-error') as Error & { expando: string };
        error.expando = 'expando-value';

        const result = serializeError(error);
        expect(result).toEqual({
            expando: 'expando-value',
            message: 'example-error',
            name: 'Error',
            stack: expect.stringContaining(
                'Error: example-error\n    at Object.test (./src/serializers/serialize-error.test.ts'
            )
        });
    });
});
