import { AUTH_STATE } from "./auth/auth.action";
import { AuthEffect } from "./auth/auth.effect";
import { authReducer } from "./auth/auth.reducer";
import { CART_STATE } from "./cart/cart.action";
import { cartReducer } from "./cart/cart.reducer";
import { SHIPPING_ADD_STATE } from "./shipping-address/shipping-address.action";
import { ShippingReducer } from "./shipping-address/shipping-address.reducer";

export const appReducer = {
    [AUTH_STATE]:authReducer,
    [CART_STATE]:cartReducer,
    [SHIPPING_ADD_STATE]:ShippingReducer
};

export const appEffects = [
    AuthEffect
];