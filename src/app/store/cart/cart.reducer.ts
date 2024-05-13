import { Action, createReducer, on } from "@ngrx/store";
import { cartModel, cartModelState, initialState } from "./cart.state";
import { addToCart, clearCart, decrementProductCount, incrementProductCount, removeToCart, validateCartSuccess } from "./cart.action";

const saveCartToLocalStorage = (state:cartModelState) => {
    if(typeof localStorage !== 'undefined'){
        localStorage.setItem('cart', JSON.stringify(state));
    }
}

const _cartReducer = createReducer(
    initialState,
    on( addToCart , (state, action) => {

        const findIndex = state.items.findIndex(product => product.productId === action.productId);
        if(findIndex !== -1){
            return state; 
        }

        const product:cartModel = {
            maxCount:action.maxCount,
            count:action.count,
            Name:action.Name,
            Image:action.Image,
            price:action.price,
            productId:action.productId
        };

        const newState = {items:[...state.items, product], totalItems: state.totalItems + 1}; 
        saveCartToLocalStorage(newState);
        return newState;
    }),

    on(removeToCart, (state, action) => {
        const items = state.items.filter(product => product.productId !== action.productId);

        const newState = {items, totalItems: state.totalItems - 1};
        saveCartToLocalStorage(newState);
        return newState;
    }),

    on(clearCart, (state, action) => {
        const newState = {items:[], totalItems:0}; 
        saveCartToLocalStorage(newState);
        return newState;
    }),

    on(incrementProductCount, (state, action) => {
        const items = state.items.map(product => {
            if(product.productId !== action.productId){
                return product;
            }

            if(product.maxCount <= product.count){
                return {...product, count: product.count };
            }
            
            return {...product, count: product.count + 1};
        });

        const newState = {items, totalItems: state.totalItems}; 
        saveCartToLocalStorage(newState);
        return newState;
    }),

    on(decrementProductCount, (state, action) => {
        const items = state.items.map(product => {
            if(product.productId !== action.productId){
                return product;
            }

            let productCount = product.count;
            if(productCount > 0){
                productCount -= 1; 
            }

            return {...product, count: productCount};
        });

        const newState = {items, totalItems: state.totalItems}; 
        saveCartToLocalStorage(newState);
        return newState;
    }),

    on(validateCartSuccess, (state, action) => {
        const cartItems = action.products.map(product => {
            const cartProduct = state.items.find(p => p.productId === product._id);
            const price = (product.price - (product.price * (product.discount/100)))

            return {
                maxCount:product.countInStock,
                count: cartProduct ? (cartProduct.count > product.countInStock ? product.countInStock : cartProduct.count) : 0,
                Name: product.name,
                Image: product.img,
                price: price,
                productId:product._id
            }
        });

        const newState = {...state, items: cartItems};
        saveCartToLocalStorage(newState);
        return newState;
    })
);

export function cartReducer(state: cartModelState | undefined, action:Action){
    return _cartReducer(state, action);
}