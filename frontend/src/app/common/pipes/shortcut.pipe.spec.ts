import { ShortcutPipe } from './shortcut.pipe';

describe('ShortcutPipe', () => {

    const pipe: ShortcutPipe = new ShortcutPipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should transform string', () => {
        const str: string = 'qwertyuiop[]1234567890-=1234567890-=';
        const expectedStr: string | void = pipe.transform(str);
        expect(expectedStr).toEqual(`${str.slice(0, 12)}...`);
        expect(typeof expectedStr === 'string' ? expectedStr.length : null)
            .toEqual(15);
    });

    it('should transform string', () => {
        const str: string = 'qwerty';
        expect(pipe.transform(str)).toEqual(str);
    });

    it('should transform string with length = 11', () => {
        const str: string = 'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm';
        const neededLength: number = 11;
        const neededStr: string | void = pipe.transform(str, neededLength);
        expect(neededStr).toEqual(`${str.slice(0, neededLength - 3)}...`);
        expect(typeof neededStr === 'string' ? neededStr.length : null).toEqual(neededLength);
    });

    it('should return void', () => {
        const someObj: any = {};
        expect(pipe.transform(someObj)).toBeUndefined();
    });

});
