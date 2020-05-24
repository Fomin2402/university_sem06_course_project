import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { ToastModule } from "./modules/toasts/toasts.module";
import { environment } from "src/environments/environment";
import {
  AuthenticationGuard,
  HttpErrorInterceptor,
  AuthTokenInterceptor,
  PrefixHttpInterceptor,
  AuthenticationService,
  UserService,
  CartService,
  OrderService,
  ProductService,
} from "./common";

import { clearState } from "./store/clear-state";
import { ProfileEffect } from "./store/effects";
import { rootReducers } from "./store";

// TODO: add stripe
const GUARDS: any[] = [AuthenticationGuard];

const INTERCEPTORS: any[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: PrefixHttpInterceptor,
    multi: true,
  },
];

const SERVICES: any[] = [
  AuthenticationService,
  CartService,
  OrderService,
  ProductService,
  UserService,
];

const EFFECTS: any = [ProfileEffect];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastModule,
    StoreModule.forRoot(rootReducers, { metaReducers: [clearState] }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(EFFECTS),
  ],
  providers: [...SERVICES, ...INTERCEPTORS, ...GUARDS],
  bootstrap: [AppComponent],
})
export class AppModule {}
