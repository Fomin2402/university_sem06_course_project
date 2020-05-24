import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthenticationGuard, HttpErrorInterceptor, AuthTokenInterceptor, PrefixHttpInterceptor, AuthenticationService } from './common';
import { ToastModule } from './modules/toasts/toasts.module';
import { environment } from 'src/environments/environment';

import { clearState } from './store/clear-state';

// TODO: add stripe
const GUARDS: any[] = [
  AuthenticationGuard
];

const INTERCEPTORS: any[] = [
  {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
  },
  {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
  },
  {
      provide: HTTP_INTERCEPTORS,
      useClass: PrefixHttpInterceptor,
      multi: true
  }
];

const SERVICES: any[] = [
  AuthenticationService
];

const EFFECTS: any = [
  ProfileEffect
];


@NgModule({
  declarations: [
      AppComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      AppRoutingModule,
      ToastModule,
      !environment.production ? StoreDevtoolsModule.instrument() : []
      StoreModule.forRoot(reducers, { metaReducers: [clearState] }),
      EffectsModule.forRoot(EFFECTS),
  ],
  providers: [
      ...SERVICES,
      ...INTERCEPTORS,
      ...GUARDS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
