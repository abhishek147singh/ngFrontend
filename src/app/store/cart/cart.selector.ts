import { createFeatureSelector, createSelector } from "@ngrx/store";
import { cartModelState } from "./cart.state";
import { CART_STATE } from "./cart.action";

const getState = createFeatureSelector<cartModelState> (CART_STATE);

export const getCart = createSelector(
    getState,
    (state) => state
);


export const getTotalNoProducts = createSelector(
    getState,
    (state) => state.totalItems
);