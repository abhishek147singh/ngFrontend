import { createAction, props } from "@ngrx/store";

export const CART_STATE = 'cart';

const addToCartAction = 'add to cart';
const removeToCartAction = 'remove to cart';
const clearCartAction = 'clear to cart';
const incrementProductCountAction = 'incr product count in cart';
const decrementProductCountAction = 'decr product count in cart';

export const addToCart = createAction(addToCartAction, props<{ productId:string; Image:string; Name:string; price:number; count:number;}> ());

export const clearCart = createAction(clearCartAction);

export const removeToCart = createAction(removeToCartAction, props<{ productId:string }> ());

export const incrementProductCount = createAction(incrementProductCountAction, props<{ productId:string }> ());

export const decrementProductCount = createAction(decrementProductCountAction, props<{ productId:string }> ());