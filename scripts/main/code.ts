import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('js', javascript);
hljs.registerLanguage('ts', typescript);

export function highlightCodeBlocks() {
    hljs.highlightAll();
}
