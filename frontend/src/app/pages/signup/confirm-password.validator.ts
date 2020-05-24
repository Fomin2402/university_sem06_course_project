import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

type ValidatorFn = (c: AbstractControl) => ValidationErrors | null;

export const confirmPasswordValidator: ValidatorFn = (form: FormGroup) => {
    const password: any = form.get('password').value;
    const confirmPass: any = form.get('confirmPassword').value;
    return password
    && confirmPass
    && typeof password === 'string'
    && typeof confirmPass === 'string'
    &&  password === confirmPass
        ? null
        : { confirmPass: true };
};