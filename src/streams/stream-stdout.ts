export const streamStdout = (content: string): void => {
    debugger;
    process.stdout.write(content);
    process.stdout.write('\n');
};
