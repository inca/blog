const particles: Element[] = [];

export function initParticles() {
    for (let i = 0; i < 32; i++) {
        const el = document.createElement('div');
        el.addEventListener('transitionend', onTransitionEnd);
        el.setAttribute('class', 'particle');
        document.documentElement.append(el);
        particles.push(el);
    }

    window.addEventListener('focusin', onFocusIn);
}

function onFocusIn(ev: FocusEvent) {
    const el = ev.target as Element;
    const rects = el.getClientRects();
    for (const el of particles) {
        const rect = rects[Math.floor(Math.random() * rects.length)];
        const [sx, sy] = getRandomPointOnPerimeter(rect, 2);
        const x = sx + window.scrollX + rect.left;
        const y = sy + window.scrollY + rect.top;
        const scale = Math.random() * .6 + .5;
        el.classList.add('particle--flying');
        el.setAttribute('style', `
            transform: translate(${x}px, ${y}px) scale(${scale});
        `);
    }
}

function onTransitionEnd(ev: TransitionEvent) {
    const el = ev.target as Element;
    el.classList.remove('particle--flying');
}

function getRandomPointOnPerimeter(rect: ClientRect, offset: number): [number, number] {
    let v = Math.random() * (rect.width + rect.height) * 2;
    if (v <= rect.width) {
        // Top edge
        return [v, -offset];
    }
    v -= rect.width;
    if (v <= rect.height) {
        // Right edge
        return [rect.width + offset, v];
    }
    v -= rect.height;
    if (v <= rect.width) {
        // Bottom edge
        return [v, rect.height + offset];
    }
    v -= rect.width;
    // Left edge
    return [-offset, v];
}
