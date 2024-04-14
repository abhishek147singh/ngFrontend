export interface cartModel{
    productId:string;
    Image:string; 
    Name:string; 
    price:number; 
    count:number; 
}

export interface cartModelState{
    items:cartModel[];
    totalItems:number;
}

const getInitialState = ():cartModelState => {
    if(typeof localStorage !== undefined){
        const cartState = localStorage.getItem('cart');
        if(cartState){
            return JSON.parse(cartState);
        }
    }

    return {
        items:[],
        totalItems:0
    };
}

export const initialState:cartModelState = getInitialState();