import SimplexNoise from 'simplex-noise';

export function initLogo() {
    const logoEl = document.querySelector('.logo')!;
    const spans = logoEl.querySelectorAll('[data-name]') ?? [];
    for (const span of spans) {
        const text = span.getAttribute('data-name') ?? '';
        for (const letter of text) {
            const sp = document.createElement('span');
            sp.innerText = letter;
            sp.setAttribute('class', 'logo-particle');
            span.appendChild(sp);
        }
    }
    const particles = [].slice.apply(logoEl.querySelectorAll('.logo-particle')) as Element[];
    randomizeParticles(particles);
    logoEl.addEventListener('mouseout', () => randomizeParticles(particles));
    logoEl.addEventListener('blur', () => randomizeParticles(particles));
}

function randomizeParticles(els: Element[]) {
    const noise = new SimplexNoise(Math.random());
    for (const [i, el] of els.entries()) {
        const tx = noise.noise2D(i * 0.1, 0);
        const ty = noise.noise2D(i * 0.1, 100);
        el.setAttribute('style', `
            --tx: ${tx * 8}px;
            --ty: ${ty * 16}px;
        `);
    }
}
