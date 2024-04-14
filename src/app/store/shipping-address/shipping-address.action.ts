import { createAction, props } from "@ngrx/store";
import { shippingAddressStateModel } from "./shipping-address.reducer";

export const SHIPPING_ADD_STATE = 'shipping_address';

const updateShippingAddressAction = 'updateShippingAddressAction';

export const updateShippingAddress = createAction(updateShippingAddressAction, props<{ model:shippingAddressStateModel }> ()); 