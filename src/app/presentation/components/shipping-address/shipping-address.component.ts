import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store.state';
import { Subscription } from 'rxjs';
import { getShippingAdd } from '../../../store/shipping-address/shipping-address.selector';
import { shippingAddressStateModel } from '../../../store/shipping-address/shipping-address.reducer';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss'
})
export class ShippingAddressComponent implements OnInit, OnDestroy {

  shipingStoreSubscription:Subscription|undefined;
  shippingState: shippingAddressStateModel|undefined;

  constructor(private store:Store<AppState>){}

  ngOnInit(): void {
    this.shipingStoreSubscription = this.store.select(getShippingAdd).subscribe(shippingState => {
      this.shippingState = shippingState;
    });  
  }
  ngOnDestroy(): void {
    this.shipingStoreSubscription?.unsubscribe();
  }
}
