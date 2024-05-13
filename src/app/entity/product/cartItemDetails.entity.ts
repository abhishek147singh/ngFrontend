import { CartItemDetailsModel } from "../../core/domain/product/cart-details-item.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface CartItemDetailsEntity extends ResponseModel<CartItemDetailsModel[]>{

}