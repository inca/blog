import { highlightCodeBlocks } from './code';
import { initDarkMode } from './dark';
import { initLinks } from './links';
import { initScroll } from './scroll';

initLinks({
    exactLinks: '.sidebar-link',
});
initDarkMode();
initScroll();
highlightCodeBlocks();
