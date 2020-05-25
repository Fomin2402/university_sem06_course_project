import { Component, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";

import { ProductService, toFormData } from "src/app/common";
import { ToastService } from "src/app/modules/toasts/toast.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
  providers: [ProductService],
})
export class EditComponent {
  @ViewChild("avatarInput")
  avatarInput: ElementRef;
  form: FormGroup;

  product!: IProduct;

  get productImage(): string | undefined {
    return this.product?.imageUrl;
  }
  get controlTitle(): AbstractControl {
    return this.form.controls["title"];
  }
  get controlPrice(): AbstractControl {
    return this.form.controls["price"];
  }
  get controlDescription(): AbstractControl {
    return this.form.controls["description"];
  }

  get controlImage(): AbstractControl {
    return this.form.controls["image"];
  }

  get controlRemoveImage(): AbstractControl {
    return this.form.controls["removeImage"];
  }

  private createMode: boolean;
  private updateMode: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private toastService: ToastService
  ) {
    this.form = new FormGroup({
      title: new FormControl("", [Validators.required]),
      price: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
    });
    this.createMode = this.route.snapshot.data.createMode;
    this.updateMode = this.route.snapshot.data.updateMode;

    if (this.createMode) {
      this.product = {
        title: "",
        price: 0,
        description: "",
      } as IProduct;
    }

    if (this.updateMode) {
      const productId: string = this.route.snapshot.paramMap.get("productId");
      this.productService
        .getProductById(productId)
        .pipe(
          catchError((error: any) => {
            console.log(error);
            return throwError(error);
          })
        )
        .subscribe((res: any) => this.initVariables(res.product));
    }
  }

  changePhoto(files: any[]): void {
    const file: File = files[0];
    this.processFile(file);

    if (this.controlImage) {
      this.controlImage.setValue(file);
    } else {
      this.form.addControl("image", new FormControl(file));
    }

    if (this.controlRemoveImage) {
      this.form.removeControl("removeImage");
    }
  }

  clearPhoto(): void {
    this.product = {
      ...this.product,
      imageUrl: undefined,
    };

    this.clearAvatarInput();

    if (this.controlImage) {
      this.form.removeControl("image");
    }

    if (!this.controlRemoveImage) {
      this.form.addControl("removeImage", new FormControl(""));
    }
  }

  public save(): void {
    if (this.form.invalid) {
      this.toastService.add({ msg: "Please, fill all requried fields." });
      return;
    }

    if (this.createMode && !this.controlImage) {
      this.toastService.add({ msg: "Image is requried." });
      return;
    }

    if (this.createMode) {
      this.productService
        .addProduct(toFormData(this.form.value))
        .pipe(
          catchError((error: any) => {
            console.log(error);
            return throwError(error);
          })
        )
        .subscribe((product: IProduct) => {
          this.toastService.add({ msg: "Product was created" });
          this.router.navigate([".."], { relativeTo: this.route });
        });
    }
    if (this.updateMode) {
      this.productService
        .updateProduct(this.product._id, toFormData(this.form.value))
        .pipe(
          catchError((error: any) => {
            console.log(error);
            return throwError(error);
          })
        )
        .subscribe((product: IProduct) => {
          this.toastService.add({ msg: "Product was updated" });
        });
    }
  }

  private initVariables(product: IProduct): void {
    if (product) {
      this.product = product;
      this.product.imageUrl = "http://localhost:3000/" + product.imageUrl;
      this.controlTitle.setValue(product.title);
      this.controlPrice.setValue(product.price);
      this.controlDescription.setValue(product.description);
    }
  }

  private processFile(file: File): void {
    const reader: FileReader = new FileReader();

    reader.addEventListener("load", (event: any) => {
      this.product.imageUrl = event.target.result;
    });

    reader.readAsDataURL(file);
  }

  private clearAvatarInput(): void {
    (this.avatarInput.nativeElement as HTMLInputElement).value = null;
  }
}
