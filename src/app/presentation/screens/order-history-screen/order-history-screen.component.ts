import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../../service/order.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { OrderListItem } from '../../../core/domain/order/order-list-item.model';
import { Router } from '@angular/router';
import { AppState } from '../../../store/store.state';
import { Store } from '@ngrx/store';
import { getAuth } from '../../../store/auth/auth.selector';

@Component({
  selector: 'app-order-history-screen',
  standalone: true,
  imports: [AsyncPipe, DatePipe],
  templateUrl: './order-history-screen.component.html',
  styleUrl: './order-history-screen.component.scss'
})
export class OrderHistoryScreenComponent implements OnInit, OnDestroy {

  orderList$:Observable<OrderListItem[]>|undefined;
  storeSubscription:Subscription|undefined;

  constructor(private orderService:OrderService, private router:Router, private store:Store<AppState>){}

  ngOnInit(): void {
    this.orderList$ = this.orderService.getOrderList();

    this.storeSubscription = this.store.select(getAuth).subscribe(authState => {
      if(!authState.token){
        this.router.navigate(['/login'], {
          queryParams: {redirectTo:'order-history'}
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription?.unsubscribe();
  }


  getOrderDetails(orderId:string){
    this.router.navigate(['/', 'payment', orderId]);
  }
}
