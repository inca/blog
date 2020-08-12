import { onReady, initContent } from '../util';
import { initMath } from './math';
import { initTheme } from './theme';
import { initLogo } from './logo';

onReady(() => {
    initMath();
    initContent();
    initTheme();
    initLogo();
});
