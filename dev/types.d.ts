declare module 'marked' {
    interface marked {
        (str: string): string;
        parseInline(str: string): string;
    }
    export = marked;
}
