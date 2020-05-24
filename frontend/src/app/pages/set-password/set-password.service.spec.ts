import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { ToastService } from 'src/app/modules/toasts/toast.service';
import { SetPasswordService } from './set-password.service';
import { AuthenticationService } from 'src/app/common';

describe('SetPasswordService', () => {

    const token: string = 'token';

    let service: SetPasswordService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                SetPasswordService,
                ToastService,
                { provide: AuthenticationService, useValue: {} },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { paramMap: convertToParamMap({ token }) }
                    }
                },
            ]
        });

        service = TestBed.inject(SetPasswordService);

    });

    it('should be created', () => expect(service).toBeTruthy());

});
