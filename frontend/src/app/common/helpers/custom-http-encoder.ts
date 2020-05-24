import { HttpParameterCodec } from '@angular/common/http';

export class CustomEncoder implements HttpParameterCodec {

    constructor() { }

    encodeKey(key: string): string {
        return key;
    }

    encodeValue(value: string): string {
        return value;
    }

    decodeKey(key: string): string {
        return key;
    }

    decodeValue(value: string): string {
        return value;
    }
}