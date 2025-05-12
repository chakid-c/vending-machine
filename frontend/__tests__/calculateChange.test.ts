import { calculateChange } from '../lib/calculateChange';

describe('calculateChange', () => {
    // กรณีทอนเงิน 14 บาท โดยมีเหรียญพอ
    // คาดหวังให้ใช้เหรียญ 10 หนึ่งเหรียญ และเหรียญ 1 สี่เหรียญ
    it("should return correct coins for exact change", () => {
        const coinStock = { 10: 5, 5: 5, 1: 5 };
        const result = calculateChange(14, coinStock);
        expect(result).toEqual({ 10: 1, 1: 4 });
    });

    // กรณีทอน 11 บาท โดยมีเหรียญ 10, 5, 1 อย่างละจำนวนจำกัด
    // คาดหวังให้เลือกใช้เหรียญ 10 หนึ่งเหรียญ และเหรียญ 1 หนึ่งเหรียญ (จำนวนน้อยที่สุด)
    it("should return correct coins using smallest number of coins", () => {
        const coinStock = { 10: 1, 5: 2, 1: 10 };
        const result = calculateChange(11, coinStock);
        expect(result).toEqual({ 10: 1, 1: 1 });
    });

    // กรณีทอนไม่ได้เพราะเหรียญไม่พอ (ทอน 5 แต่มีเหรียญแค่ 1 บาทเดียว)
    // คาดหวังให้คืน null
    it("should return null when not enough coins", () => {
        const coinStock = { 10: 0, 5: 0, 1: 1 };
        const result = calculateChange(5, coinStock);
        expect(result).toBeNull();
    });

    // กรณีไม่สามารถทอนเป๊ะ ๆ ได้ (ทอน 2 บาท แต่ไม่มีเหรียญ 2 และเหรียญอื่นก็ทอนไม่ลงตัว)
    // คาดหวังให้คืน null
    it("should return null when change cannot be made exactly", () => {
        const coinStock = { 10: 1, 5: 1, 1: 1 }; // total = 16, but 2 baht not possible
        const result = calculateChange(2, coinStock);
        expect(result).toBeNull();
    });

    // กรณีมีเหรียญครบ และควรเลือกใช้เหรียญราคาสูงก่อน
    // คาดหวังให้ใช้เหรียญ 10 สองเหรียญ และเหรียญ 5 หนึ่งเหรียญ
    it("should prefer higher denominations when available", () => {
        const coinStock = { 10: 2, 5: 5, 1: 5 };
        const result = calculateChange(25, coinStock);
        expect(result).toEqual({ 10: 2, 5: 1 });
    });
});

