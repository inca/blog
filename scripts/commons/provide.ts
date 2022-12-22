import { ServiceConstructor } from 'mesh-ioc';

export const globalProvideMap = new Map<string, ServiceConstructor<any>>();

export function provide(alias: string) {
    return function (target: ServiceConstructor<any>) {
        globalProvideMap.set(alias, target);
    };
}
