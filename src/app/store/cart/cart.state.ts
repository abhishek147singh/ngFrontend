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

export const initialState:cartModelState = {
    items:[],
    totalItems:0
};