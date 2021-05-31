import { onReady, initContent } from '../util';
import { initMath } from './math';
import { initTheme } from './theme';

onReady(() => {
    initMath();
    initContent();
    initTheme();
    // initParticles();
});
