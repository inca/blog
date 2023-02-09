export interface DebounceOptions {
    leading?: boolean;
    trailing?: boolean;
}

export function debounce(delay: number, options: DebounceOptions = {}) {
    const { leading = false, trailing = true } = options;
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        let timer: any = null;
        let waiting = false;
        let called = false;
        const originalMethod = descriptor.value;
        descriptor.value = function debounced(...args: any[]) {
            if (leading && !waiting) {
                originalMethod.apply(this, args);
                called = true;
            } else {
                called = false;
            }
            waiting = true;
            clearTimeout(timer);
            timer = setTimeout(() => {
                waiting = false;
                if (trailing && !called) {
                    originalMethod.apply(this, args);
                    called = true;
                }
            }, delay);
        };
    };
}
