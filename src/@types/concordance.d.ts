declare module 'concordance' {
    interface Options {
        maxDepth: number;
        plugins: string[];
        theme: any;
    }

    export function format(object: any, options?: Options): string;
}
