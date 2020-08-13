import { onReady, initContent } from '../util';
import { initMath } from './math';
import { initTheme } from './theme';
import { initLogo } from './logo';
import { initParticles } from './particles';

onReady(() => {
    initMath();
    initContent();
    initTheme();
    initLogo();
    initParticles();
});
