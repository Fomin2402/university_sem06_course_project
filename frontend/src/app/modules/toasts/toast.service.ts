import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// TODO: add some types of toasts: INFO, WARNING, ERROR

const TIMEOUT: number = 5000;
const MAX: number = 3;
const ACTION: string = 'OK';

@Injectable()
export class ToastService {

    private _$toasts: BehaviorSubject<IToastData[]> = new BehaviorSubject<IToastData[]>([]);

    private _toasts: IToastData[] = [];
    private _queue: IToastPayload[] = [];

    get $toasts(): any {
        return this._$toasts;
    }

    constructor() {}

    add(toastPayload: IToastPayload): void {
        if (this._toasts.length >= MAX) {
            this._queue.push(toastPayload);
            return;
        }

        const toast: IToastData = this.formToast(toastPayload);

        this._toasts.push(toast);
        this.dispatch();
    }

    private formToast(payload: IToastPayload): IToastData {
        const id: string = this.formUID();
        const timeoutObj: any = setTimeout(() => this.onRemove(id), payload.timeout || TIMEOUT);

        if (!(payload.action && payload.action.text)) {
            payload.action = {
                ...payload.action,
                text: ACTION
            };
        }

        if (payload.action) {
            const fcn: (() => void) | undefined = payload.action.onClick;
            payload.action.onClick = () => {
                if (fcn && typeof fcn === 'function') {
                    fcn();
                }

                this.onRemove(id);
            };
        }

        if (payload.onAdd && typeof payload.onAdd === 'function') {
            payload.onAdd();
        }

        return {
            ...payload,
            id,
            timeoutObj
        };
    }

    private onRemove(id: string): void {
        this.remove(id);
        this.checkQueue();
        this.dispatch();
    }
    private remove(id: string): any {
        const toast: IToastData | undefined = this._toasts.find((obj: IToastData) => obj.id === id);
        const { onRemove = undefined, timeoutObj = undefined } = { ...toast };

        if (onRemove) {
            onRemove();
        }

        if (timeoutObj) {
            clearTimeout(timeoutObj);
        }

        this._toasts = this._toasts.filter((obj: IToastData) => obj.id !== id);
    }

    private checkQueue(): void {
        if (this._queue.length) {
            const toast: IToastData = this.formToast(this._queue.shift());
            this._toasts.push(toast);
        }
    }

    private formUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: any) => {
            const r: number = Math.random() * 16 | 0;
            const v: number = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    private dispatch(): void {
        this._$toasts.next(this._toasts);
    }

}
