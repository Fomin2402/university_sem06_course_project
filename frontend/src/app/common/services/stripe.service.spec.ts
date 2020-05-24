import { TestBed } from '@angular/core/testing';

import { StripeService } from './stripe.service';

// TODO: add tests

describe('StripeService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            StripeService
        ]
    }));

    it('should be created', () => {
        const service: StripeService = TestBed.inject(StripeService);
        expect(service).toBeTruthy();
    });
});
