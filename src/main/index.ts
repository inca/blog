import { onReady, initContent } from './util';
import { initMath } from './math';

onReady(() => {
    initMath();
    initContent();
});
