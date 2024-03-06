import { AUTH_STATE } from "./auth/auth.action";
import { AuthEffect } from "./auth/auth.effect";
import { authReducer } from "./auth/auth.reducer";
import { CART_STATE } from "./cart/cart.action";
import { cartReducer } from "./cart/cart.reducer";

export const appReducer = {
    [AUTH_STATE]:authReducer,
    [CART_STATE]:cartReducer
};

export const appEffects = [
    AuthEffect
];