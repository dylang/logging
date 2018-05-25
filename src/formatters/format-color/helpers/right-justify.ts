export const rightJustify = (str: string | number, length: number) => `${' '.repeat(Math.max(length - String(str).length, 0))}${str}`;
