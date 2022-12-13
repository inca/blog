import { Mesh } from '@nodescript/mesh';

export interface InitHandler {
    target: any;
    methodName: string;
}

export const initHandlers: InitHandler[] = [];

export function init() {
    return (target: any, methodName: string) => {
        initHandlers.push({
            target: target.constructor,
            methodName,
        });
    };
}

export async function invokeInitHandlers(mesh: Mesh, recursive = false) {
    const handlers = [...findInitHandlers(mesh, recursive)];
    const promises = handlers.map(h => h.target[h.methodName]());
    await Promise.all(promises);
}

function* findInitHandlers(mesh: Mesh, recursive = true): IterableIterator<InitHandler> {
    for (const [key, binding] of mesh) {
        if (binding.type === 'service') {
            for (const t of initHandlers) {
                if (t.target === binding.class || t.target.isPrototypeOf(binding.class)) {
                    yield {
                        target: mesh.resolve(key),
                        methodName: t.methodName,
                    };
                }
            }
        }
    }
    if (recursive && mesh.parent) {
        yield* findInitHandlers(mesh.parent, recursive);
    }
}
