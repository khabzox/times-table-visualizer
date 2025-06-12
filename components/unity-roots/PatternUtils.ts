export const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

export const getPatternName = (mult: number, n: number): string => {
    const m = Math.round(mult);
    if (m === 2) return 'Cardioid';
    if (m === 3) return 'Nephroid';
    if (m === 4) return 'Three-cusped Epicycloid';
    if (m === 5) return 'Four-cusped Epicycloid';
    if (isPrime(m)) return `Prime Pattern (${m})`;
    return `Multiplier ${m}`;
};