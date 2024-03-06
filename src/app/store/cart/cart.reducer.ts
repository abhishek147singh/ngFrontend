import { Action, createReducer, on } from "@ngrx/store";
import { cartModel, cartModelState, initialState } from "./cart.state";
import { addToCart, decrementProductCount, incrementProductCount, removeToCart } from "./cart.action";

const _cartReducer = createReducer(
    initialState,
    on( addToCart , (state, action) => {

        const findIndex = state.items.findIndex(product => product.productId === action.productId);
        if(findIndex !== -1){
            return state; 
        }

        const product:cartModel = {
            count:action.count,
            Name:action.Name,
            Image:action.Image,
            price:action.price,
            productId:action.productId
        }

        return {items:[...state.items, product], totalItems: state.totalItems + 1};
    }),

    on(removeToCart, (state, action) => {
        const items = state.items.filter(product => product.productId !== action.productId);

        return {items, totalItems: state.totalItems - 1};
    }),

    on(incrementProductCount, (state, action) => {
        const items = state.items.map(product => {
            if(product.productId !== action.productId){
                return product;
            }

            return {...product, count: product.count + 1};
        });

        return {items, totalItems: state.totalItems};
    }),

    on(decrementProductCount, (state, action) => {
        const items = state.items.map(product => {
            if(product.productId !== action.productId){
                return product;
            }

            return {...product, count: product.count - 1};
        });

        return {items, totalItems: state.totalItems};
    })
);

export function cartReducer(state: cartModelState | undefined, action:Action){
    return _cartReducer(state, action);
}