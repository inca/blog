declare module 'marked' {
    interface Marked {
        (str: string, options?: object): string;
        parseInline(str: string, options?: object): string;
    }
    const marked: Marked;
    export = marked;
}
