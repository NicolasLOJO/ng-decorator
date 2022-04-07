import { ElementRef } from './element_ref';
import { defineMetadata, getMetadata, metadataKeys } from './utils';
import { Type } from './type';

/** @internal */
export interface IViewChildren {
    [property: string]: {
        first: boolean;
        selector: any;
        read?: typeof ElementRef;
    };
}

export function ViewChild(
    selector: Type<any> | Function | string,
    opts: { read?: typeof ElementRef } = {}
): any {
    return (target: any, key: string) =>
        addBindingToMetadata(target, key, selector, true, opts.read);
}

export function ViewChildren(
    selector: Type<any> | Function | string,
    opts: { read?: typeof ElementRef } = {}
): any {
    return (target: any, key: string) =>
        addBindingToMetadata(target, key, selector, false, opts.read);
}

/** @internal */
function addBindingToMetadata(
    target: any,
    key: string,
    selector: Type<any> | Function | string,
    first: boolean,
    read?: typeof ElementRef
) {
    const targetConstructor = target.constructor;
    const viewChildren: IViewChildren =
        getMetadata(metadataKeys.viewChildren, targetConstructor) || {};
    viewChildren[key] = { first, selector, read };
    defineMetadata(metadataKeys.viewChildren, viewChildren, targetConstructor);
}
