declare module 'marked' {
    interface Marked {
        (str: string): string;
        parseInline(str: string): string;
    }
    const marked: Marked;
    export = marked;
}
