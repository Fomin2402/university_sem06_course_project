import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest
} from '@angular/common/http/testing';

import { PrefixHttpInterceptor } from './prefix-http.interceptor';
import { environment } from 'src/environments/environment';

// TODO: update here
describe('AuthHttpInterceptor', () => {
    let httpMock: HttpTestingController;
    let httpService: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                HttpClient,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: PrefixHttpInterceptor,
                    multi: true
                }
            ]
        });

        httpService = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should add prefix to url', () => {
        const url: string = 'some/path';
        httpService.get(url).subscribe();
        const req: TestRequest = httpMock.expectOne(
            `${environment.url}/api/${url}`
        );
        expect(req.request.method).toEqual('GET');
    });

    afterEach(() => {
        httpMock.verify();
    });
});
