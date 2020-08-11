export type Theme = 'dark' | 'light';

const prefersDarkTheme = window.matchMedia ?
    window.matchMedia('(prefers-color-scheme: dark)').matches : false;
const autoDetectedTheme = prefersDarkTheme ? 'dark' : 'light';

/**
 * Theme set by user.
 */
let userTheme: Theme | null = null;

export function initTheme() {
    userTheme = readThemeFromLocalStorage();
    updateTheme(getTheme());
}

export function getTheme() {
    return userTheme ?? autoDetectedTheme;
}

export function readThemeFromLocalStorage(): Theme | null {
    const val = localStorage.getItem('theme') || '';
    if (val === 'light' || val === 'dark') {
        return val;
    }
    return null;
}

export function updateTheme(theme: Theme) {
    const html = document.documentElement;
    html.classList.remove('theme--light', 'theme--dark');
    html.classList.add('theme--' + theme);
}

export function setTheme(theme: Theme | null) {
    userTheme = theme;
    localStorage.setItem('theme', theme ?? '');
    updateTheme(getTheme());
}
