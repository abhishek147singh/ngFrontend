import { createAction, props } from "@ngrx/store";
import { CartItemDetailsModel } from "../../core/domain/product/cart-details-item.model";

export const CART_STATE = 'cart';

const addToCartAction = 'add to cart';
const removeToCartAction = 'remove to cart';
const clearCartAction = 'clear to cart';
const incrementProductCountAction = 'incr product count in cart';
const decrementProductCountAction = 'decr product count in cart';
const validateCartAction = 'validate cart';
const validateCartSuccessAction = 'validate cart success';
const validateCartErrorAction = 'validate cart error';

export const addToCart = createAction(addToCartAction, props<{ productId:string; Image:string; Name:string; price:number; count:number; maxCount:number;}> ());

export const clearCart = createAction(clearCartAction);

export const removeToCart = createAction(removeToCartAction, props<{ productId:string }> ());

export const incrementProductCount = createAction(incrementProductCountAction, props<{ productId:string }> ());

export const decrementProductCount = createAction(decrementProductCountAction, props<{ productId:string }> ());

export const validateCart = createAction(validateCartAction, props<{productIds:string[]}> ());

export const validateCartSuccess = createAction(validateCartSuccessAction, props<{ products:CartItemDetailsModel[]}> ());

export const validateCartError = createAction(validateCartErrorAction, props<{ message:string}> ());