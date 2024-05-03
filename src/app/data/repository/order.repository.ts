import { Injectable } from "@angular/core";
import { IOrderRepository } from "../../core/repository/IOrder.repository";
import { baseUrl } from "../../../environment";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { getAuth } from "../../store/auth/auth.selector";
import { AppState } from "../../store/store.state";
import { Observable, map } from "rxjs";
import { OrderSubmitionModel } from "../../core/domain/order/order-submition.model";
import { ResponseModel } from "../../core/domain/response.model";
import { OrderModel } from "../../core/domain/order/order.model";
import { OrderEntity } from "../../entity/order/order.entity";
import { OrderListItem } from "../../core/domain/order/order-list-item.model";
import { OrderListEntity } from "../../entity/order/oder-list.entity";

@Injectable({
    providedIn: 'root'
})

export class OrderRepository extends IOrderRepository{
    
    baseUrl = baseUrl;
    token = '';
    
    constructor(private http:HttpClient,private store:Store<AppState>){
        super();
        this.store.select(getAuth).subscribe(authState => {
            this.token = authState.token;
        })
    }

    override placeOrder(order: OrderSubmitionModel): Observable<string> {
        const url = `${baseUrl}/api/order`;

        return this.http.post<ResponseModel<string>> (url, order,{
            headers:{'authorization': this.token}
        }).pipe(
             map((response) => {
                 if (response.status) {
                     return response.data;
                 }
 
                 throw new Error(response.message);
             })
         );
    }

    override getOrderDetails(id: string): Observable<OrderModel> {
        const url = `${baseUrl}/api/order/${id}`;

        return this.http.get<OrderEntity> (url,{
            headers:{'authorization': this.token}
        }).pipe(
             map((response) => {
                 if (response.status) {
                     return response.data;
                 }
 
                 throw new Error(response.message);
             })
         );
    }


    override getOrderList(): Observable<OrderListItem[]> {
        const url = `${baseUrl}/api/order/mine`;

        return this.http.get<OrderListEntity> (url,{
            headers:{'authorization': this.token}
        }).pipe(
             map((response) => {
                 if (response.status) {
                     return response.data;
                 }
 
                 throw new Error(response.message);
             })
         );
    }
}
