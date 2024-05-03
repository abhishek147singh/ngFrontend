import { OrderListItem } from "../../core/domain/order/order-list-item.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface OrderListEntity extends ResponseModel<OrderListItem[]> {

}