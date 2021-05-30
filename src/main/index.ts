import { onReady, initContent } from '../util';
import { initMath } from './math';
import { initTheme } from './theme';
import { initParticles } from './particles';

onReady(() => {
    initMath();
    initContent();
    initTheme();
    initParticles();
});
