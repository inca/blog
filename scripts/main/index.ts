import { initLinks } from './links';
import { initDarkMode } from './dark';
import { highlightCodeBlocks } from './code';
import { initScroll } from './scroll';

initLinks({
    exactLinks: '.sidebar-link',
});
initDarkMode();
initScroll();
highlightCodeBlocks();
