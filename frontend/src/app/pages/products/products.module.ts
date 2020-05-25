import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { NgModule } from "@angular/core";

import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products/products.component";
import { ProductsService } from "./products/products.service";
import { productReducer } from "./store/product.reducer";
import { ProductEffect } from "./store/product.effects";
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [ProductsComponent, EditComponent],
  providers: [ProductsService],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature("productState", productReducer),
    EffectsModule.forFeature([ProductEffect]),
  ],
})
export class ProductsModule {}
