import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { StripeService } from '../services';

@Injectable()
export class StripeResolver implements Resolve<boolean> {

    constructor(private stripeService: StripeService) { }

    resolve(): Observable<boolean> {
        return this.stripeService.waitForStripeDataLoad();
    }

}
