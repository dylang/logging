import {getPrefix} from './get-prefix';

jest.mock('chalk', () => ({
    default: ({
        mockColor: (x: string) => `mockColor${x}`,
        gray: (x: string) => `gray${x}`
    })
}));
jest.mock('./timestamp', () => ({
    timestamp: () => 'timestamp'
}));

describe('get-prefix', () => {
    test('getPrefix', async () => {
        const result = getPrefix();
        expect(result).toEqual('graytimestamp [mockColorlabel type] ');
    });
});
