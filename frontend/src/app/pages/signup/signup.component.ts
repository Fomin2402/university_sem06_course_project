import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";

import { confirmPasswordValidator } from "./confirm-password.validator";
import { AuthenticationService } from "src/app/common";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { ToastService } from "src/app/modules/toasts/toast.service";

@Component({
  selector: "realtorx-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  showPassword: boolean;
  signupForm: FormGroup;
  error: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private toastService: ToastService
  ) {
    this.signupForm = new FormGroup(
      {
        fullname: new FormControl("", [Validators.required]),
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl("", [Validators.required]),
        termsAndPolicy: new FormControl(false, [
          Validators.required,
          Validators.requiredTrue,
        ]),
      },
      { validators: confirmPasswordValidator }
    );
  }

  get fullname(): AbstractControl {
    return this.signupForm.controls["fullname"];
  }
  get email(): AbstractControl {
    return this.signupForm.controls["email"];
  }
  get password(): AbstractControl {
    return this.signupForm.controls["password"];
  }
  get confirmPassword(): AbstractControl {
    return this.signupForm.controls["confirmPassword"];
  }
  get termsAndPolicy(): AbstractControl {
    return this.signupForm.controls["termsAndPolicy"];
  }

  ngOnInit(): void {}

  switchShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    const body: ISignUpParams = {
      // full_name: this.fullname.value,
      password: this.password.value,
      email: this.email.value,
      confirmPassword: this.confirmPassword.value,
    };

    this.authenticationService
      .signup(body)
      .pipe(
        tap((res: any) => this.toastService.add({ msg: res.message })),
        tap(() => this.authenticationService.redirectToLoginPage()),
        catchError((err: any) => {
          const msg: string = err.error.message || "Sorry, somthing went wrong";
          this.toastService.add({ msg });
          this.error = true;
          return throwError(err);
        })
      )
      .subscribe();
  }
}
