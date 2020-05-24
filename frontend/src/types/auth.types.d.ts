interface IProfileCreditionals {
  email: string;
  password: string;
}

interface ILoignResponse extends IUser {
  token: string;
}

interface ISignUpParams {
  email: string;
  password: string;
  confirmPassword: string;
}

interface IResetPassParams {
  resetToken: string;
  password: string;
}
