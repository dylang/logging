export const streamStdout = (content: string) => {
    process.stdout.write(content);
    process.stdout.write('\n');
    return content;
};
