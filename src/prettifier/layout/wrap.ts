import wrapAnsi from 'wrap-ansi';

export const wrap = (content: string, columns: number) => wrapAnsi(content, columns, { trim: false, hard: true });
