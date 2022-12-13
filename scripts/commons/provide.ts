import { ServiceConstructor } from '@nodescript/mesh';

export const globalProvideMap = new Map<string, ServiceConstructor<any>>();

export function provide(alias: string) {
    return function (target: ServiceConstructor<any>) {
        globalProvideMap.set(alias, target);
    };
}
