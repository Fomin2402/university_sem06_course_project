import { Pipe, PipeTransform } from '@angular/core';

const MIM_LENGTH: number = 7;

@Pipe({
    name: 'shortcut'
})
export class ShortcutPipe implements PipeTransform {
    transform(value: any, maxLength: number = 15): string | void {
        if (typeof value !== 'string' || maxLength <= MIM_LENGTH) {
            return;
        }
        return value.length < maxLength
            ? value
            : `${value.slice(0, maxLength - 3)}...`;
    }
}
