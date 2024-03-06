import { AUTH_STATE } from "./auth/auth.action";
import { AuthState } from "./auth/auth.state";
import { CART_STATE } from "./cart/cart.action";
import { cartModelState } from "./cart/cart.state";

export interface AppState{
    [AUTH_STATE]:AuthState,
    [CART_STATE]:cartModelState
}