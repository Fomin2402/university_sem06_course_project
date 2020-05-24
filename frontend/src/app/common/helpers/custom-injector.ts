import { Injector, Type, InjectionToken, InjectFlags } from '@angular/core';

export class CustomInjector implements Injector {
    constructor(private _parentInjector: Injector, private _additionalTokens: WeakMap<any, any>) {}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T {
        const value: any = this._additionalTokens.get(token);

        if (value) {return value; }

        return this._parentInjector.get<any>(token, notFoundValue);
    }
}
