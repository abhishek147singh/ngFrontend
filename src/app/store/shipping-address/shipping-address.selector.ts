import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SHIPPING_ADD_STATE } from "./shipping-address.action";
import { shippingAddressStateModel } from "./shipping-address.reducer";

const getState = createFeatureSelector<shippingAddressStateModel> (SHIPPING_ADD_STATE);

export const getShippingAdd = createSelector(
    getState,
    (state) => state
);