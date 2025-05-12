export function calculateChange(amount: number, coinStock: Record<number, number>): Record<number, number> | null {
    // แปลง key ของ coinStock เป็นตัวเลข แล้วเรียงจากค่ามากไปน้อย
    const coins = Object.keys(coinStock)
        .map(Number)
        .sort((a, b) => b - a); 

    const result: Record<number, number> = {};

    let remaining = amount;

    // วนลูปเหรียญแต่ละชนิดจากใหญ่ไปเล็ก
    for (const coin of coins) {
        const needed = Math.floor(remaining / coin);

        const available = coinStock[coin];

        const use = Math.min(needed, available);

        if (use > 0) {
            result[coin] = use;
            remaining -= coin * use;
        }
    }

    if (remaining === 0) {
        return result;
    }

    return null;
}
