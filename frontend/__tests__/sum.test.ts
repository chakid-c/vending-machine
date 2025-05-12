import { sum } from '../lib/sum'; 

describe('sum function', () => {
    it('should add two numbers correctly', () => {
        expect(sum(1, 2)).toBe(3);
    });
});
