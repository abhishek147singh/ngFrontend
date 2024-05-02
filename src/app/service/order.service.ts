import { Injectable } from "@angular/core";
import { IOrderService } from "../core/service/IOrder.service";
import { OrderRepository } from "../data/repository/order.repository";
import { Observable } from "rxjs";
import { OrderSubmitionModel } from "../core/domain/order/order-submition.model";
import { OrderModel } from "../core/domain/order/order.model";

@Injectable({
    providedIn:'root'
}) 

export class OrderService extends IOrderService{

    constructor(private orderRepository : OrderRepository){
        super();
    }

    override placeOrder(order: OrderSubmitionModel): Observable<string> {
        return this.orderRepository.placeOrder(order);
    }

    override getOrderDetails(id: string): Observable<OrderModel> {
        return this.orderRepository.getOrderDetails(id);
    }
}