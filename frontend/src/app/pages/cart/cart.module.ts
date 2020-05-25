import { MatDialogModule } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { NgModule } from "@angular/core";

import { LoadingModule } from "src/app/modules/loading/loading.module";
import { CartRoutingModule } from "./cart-routing.module";
import { CartComponent } from "./cart/cart.component";
import { cartReducer } from "./store/cart.reducer";
import { CartEffect } from "./store/cart.effects";
import { CartService } from "src/app/common";
import { PaymentComponent } from "./payment/payment.component";

@NgModule({
  declarations: [CartComponent, PaymentComponent],
  providers: [CartService],
  imports: [
    CommonModule,
    CartRoutingModule,
    LoadingModule,
    StoreModule.forFeature("cartState", cartReducer),
    EffectsModule.forFeature([CartEffect]),
    MatDialogModule,
  ],
})
export class CartModule {}
