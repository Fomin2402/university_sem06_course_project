import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import {
  Component,
  OnInit,
  Inject,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

import { ToastService } from "src/app/modules/toasts/toast.service";
import { StripeService, OrderService } from "src/app/common";
import { catchError, switchMap } from "rxjs/operators";
import { throwError, from } from "rxjs";

const cardStyle: any = {
  base: {
    color: "#32325d",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4",
    },
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a",
  },
};

@Component({
  selector: "app-payment",
  animations: [
    trigger("fadeInOut", [
      state(
        "void",
        style({
          opacity: 0,
        })
      ),
      transition("void <=> *", animate(200)),
    ]),
  ],
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
  providers: [OrderService],
})
export class PaymentComponent implements OnInit, OnDestroy {
  @ViewChild("cardInfo", { static: true })
  cardInfo!: ElementRef;

  card: any;
  cardHandler: any = this.onChange.bind(this);
  error!: string | null;

  get isStateInitialized(): boolean {
    return this.state === ChargeState.INITIALIZED;
  }
  get isStatePending(): boolean {
    return this.state === ChargeState.PENDING;
  }
  get isStateSuccess(): boolean {
    return this.state === ChargeState.SUCCESS;
  }
  get isStateError(): boolean {
    return this.state === ChargeState.ERROR;
  }

  private state: ChargeState;

  constructor(
    public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stripeService: StripeService,
    private cd: ChangeDetectorRef,
    private orderService: OrderService,
    private toastService: ToastService,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.state = ChargeState.INITIALIZED;
  }

  ngAfterViewInit(): void {
    this.card = this.stripeService.elements.create("card", {
      style: cardStyle,
    });
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener("change", this.cardHandler);
  }

  closeCardBinding(): void {
    if (this.isStatePending) {
      return;
    }

    this.dialogRef.close();
  }

  submit(): void {
    if (this.isStatePending || this.error) {
      return;
    }

    this.state = ChargeState.PENDING;

    this.runTransaction();
  }

  ngOnDestroy(): void {
    this.card.removeEventListener("change", this.cardHandler);
    this.card.destroy();
  }

  private onChange({ error }: any): void {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  private runTransaction(): void {
    from(this.stripeService.stripe.createToken(this.card))
      .pipe(
        switchMap(({ token, error }: any) => {
          if (!!error) {
            return throwError(error);
          }

          return this.orderService.makeOrder(token.id);
        }),
        catchError((error: any) => {
          console.log(error);
          this.state = ChargeState.ERROR;
          this.toastService.add({
            msg: "Sorry, something went wrong. We already work on it",
          });
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.state = ChargeState.SUCCESS;
        this.toastService.add({ msg: "Purchase completed successfully." });
        this.router.navigate(["/orders"]);
      });
  }
}
