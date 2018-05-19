export const timestamp = (now = new Date()) => {
    const date = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
    return date.toISOString().replace(/.*T(.*)Z/, '$1');
};
