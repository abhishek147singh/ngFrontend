import { OrderModel } from "../../core/domain/order/order.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface OrderEntity extends ResponseModel<OrderModel> {
    
}