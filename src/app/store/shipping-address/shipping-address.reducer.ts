import { Action, createReducer, on } from "@ngrx/store";
import { updateShippingAddress } from "./shipping-address.action";

export interface shippingAddressStateModel{
    fName: string;
    lName: string;
    email: string;
    mobile: string;
    address1: string;
    city: string;
    country: string;
    state: string;
    zip:string;
}

const getInitialState = ():shippingAddressStateModel => {
    if(typeof localStorage !== 'undefined'){
        const shippingState = localStorage.getItem('shipping');
        if(shippingState){
            return JSON.parse(shippingState);
        }
    }

    return {
        fName: '',
        lName: '',
        email: '',
        mobile: '',
        address1: '',
        city: '',
        country: '',
        state: '',
        zip:''
    }
}


const _shippingReducer = createReducer(
    getInitialState(),
    on(updateShippingAddress, (state, action) => {
        localStorage.setItem('shipping', JSON.stringify(action.model));
        return action.model;
    })
)

export function ShippingReducer(state:shippingAddressStateModel|undefined, action:Action){
    return _shippingReducer(state, action);
}