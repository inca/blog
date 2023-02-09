import moonSvg from '../../resources/icons/moon.svg?raw';
import sunSvg from '../../resources/icons/sun.svg?raw';

export type ColorMode = 'light' | 'dark';

export function initDarkMode() {
    const switchEl = createSwitchEl();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyCurrentMode);
    applyCurrentMode();
    if (switchEl) {
        initSwitchEl(switchEl);
    }
}

function applyCurrentMode() {
    const mode = getCurrentMode();
    if (mode === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
    }
}

function getPreferredMode(): ColorMode {
    const m = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return m ? 'dark' : 'light';
}

function getCurrentMode(): ColorMode {
    const explicitMode = localStorage.getItem('colorMode') ?? '';
    if (['dark', 'light'].includes(explicitMode)) {
        return explicitMode as ColorMode;
    }
    return getPreferredMode();
}

function initSwitchEl(switchEl: HTMLElement) {
    switchEl.addEventListener('click', toggleMode);
    switchEl.innerHTML = moonSvg + sunSvg;
}

function toggleMode() {
    const currentMode = getCurrentMode();
    const desiredMode = currentMode === 'light' ? 'dark' : 'light';
    if (desiredMode === getPreferredMode()) {
        localStorage.removeItem('colorMode');
    } else {
        localStorage.setItem('colorMode', desiredMode);
    }
    applyCurrentMode();
}

function createSwitchEl() {
    const parent = document.querySelector('.header-container');
    if (!parent) {
        return;
    }
    const el = document.createElement('div');
    el.setAttribute('class', 'color-mode-switch');
    parent.appendChild(el);
    return el;
}
