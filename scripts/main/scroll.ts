
export function initScroll() {
    applyScrollClasses();
    window.addEventListener('scroll', ev => {
        applyScrollClasses();
    }, { passive: true });
}

function applyScrollClasses() {
    const isTop = window.scrollY < 16;
    if (isTop) {
        document.documentElement.classList.add('top');
    } else {
        document.documentElement.classList.remove('top');
    }
}
