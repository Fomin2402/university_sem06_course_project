import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable()
export class StripeService {

    stripe!: IStripe;
    elements!: IStripeElements;

    private isLoaded: BehaviorSubject<boolean>;

    constructor() {
        this.isLoaded = new BehaviorSubject<boolean>(false);
    }

    waitForStripeDataLoad(): Observable<boolean> {
        if (!this.isStripeDataLoaded()) {
            this.loadStripe();
        }
        return this.isLoaded.pipe(
            filter((res: boolean) => res),
            first()
        );
    }

    private isStripeDataLoaded(): boolean {
        return !!window.document.getElementById('stripe-script');
    }

    private loadStripe(): void {
        const s: HTMLScriptElement = window.document.createElement('script');
        s.id = 'stripe-script';
        s.type = 'text/javascript';
        s.src = 'https://js.stripe.com/v3/';
        s.onload = () => this.configureStripe();
        window.document.body.appendChild(s);
    }

    private configureStripe(): void {
        this.stripe = Stripe(environment.stripeKey);
        this.elements = this.stripe.elements();
        this.isLoaded.next(true);
    }

}
