import { HttpParams } from '@angular/common/http';

export function formHttpParams(params: Record<string, string | boolean | number>): HttpParams {
    let httpParams: HttpParams = new HttpParams();

    for (const key in params) {
        if (params[key] && isValid(params[key])) {
            httpParams = httpParams.append(key, params[key].toString());
        }
    }

    return httpParams;
}

function isValid(value: any): boolean {
    return typeof value ===  'string'
        || typeof value === 'number'
        || typeof value === 'boolean';
}