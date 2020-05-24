type IndexedObject = {
    [key: string]: any;
};

interface IProfileState {
    user: IUser | null;
    loading: boolean;
    error: Error | null;
}

interface ISpinnerState {
    display: boolean;
}

interface IAppState {
    profileState: IProfileState;
    spinnerState: ISpinnerState;
}

type IStripe = any;
type IStripeElements = any;
type StripeTokenResponse = any;

// TODO: check why namespace from @types/stripe-v3 not recognized
// eslint-disable-next-line no-var
declare var Stripe: any; // stripe.StripeStatic;

// interface IStripe extends stripe.Stripe {}
// interface IStripeElements extends stripe.elements.Elements {}
// interface StripeTokenResponse extends stripe.TokenResponse {}
