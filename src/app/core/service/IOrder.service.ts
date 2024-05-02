import { Observable } from "rxjs";
import { OrderSubmitionModel } from "../domain/order/order-submition.model";
import { OrderModel } from "../domain/order/order.model";

export abstract class IOrderService{
    abstract placeOrder(order:OrderSubmitionModel):Observable<string>;

    abstract getOrderDetails(id:string):Observable<OrderModel>;
}