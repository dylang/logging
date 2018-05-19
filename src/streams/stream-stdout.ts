export const streamStdout = (content: string): void => {
    process.stdout.write(content);
    process.stdout.write('\n');
};
