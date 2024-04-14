import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SectionComponent } from '../../components/section/section.component';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { assetsPath } from '../../../../environment';
import { getAuth } from '../../../store/auth/auth.selector';
import { getCart } from '../../../store/cart/cart.selector';
import { cartModel } from '../../../store/cart/cart.state';
import { AppState } from '../../../store/store.state';
import { getShippingAdd } from '../../../store/shipping-address/shipping-address.selector';
import { ShippingAddressComponent } from '../../components/shipping-address/shipping-address.component';

@Component({
  selector: 'app-payment-screen',
  standalone: true,
  imports: [StepperComponent, SectionComponent, RouterLink, PaymentScreenComponent, ShippingAddressComponent],
  templateUrl: './payment-screen.component.html',
  styleUrl: './payment-screen.component.scss'
})

export class PaymentScreenComponent implements OnInit, OnDestroy {
  steps = [
    { title:'signin', isSuccess:true},
    { title:'shipping', isSuccess:true},
    { title:'payment', isSuccess:false},
    { title:'place order', isSuccess:false},
  ];

  cartSubscription:Subscription|undefined;
  productCartCount:number = 1;

  assetsPath = assetsPath;

  cartProducts:cartModel[] = [];

  shippingCharge:number = 0;

  storeSubscription:Subscription|undefined;
  shipingStoreSubscription:Subscription|undefined;

  constructor(private store:Store<AppState>, private router:Router){}

  ngOnInit(): void {
    this.storeSubscription = this.store.select(getAuth).subscribe(authState => {
      if(!authState.token){
        this.router.navigate(['/login'], {
          queryParams: {redirectTo:'shipping'}
        });
      }
    });

    this.cartSubscription = this.store.select(getCart).subscribe((cartState => {
      this.cartProducts = cartState.items; 
    }));
  }

  ngOnDestroy(): void {
    this.storeSubscription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
  }
 
  getProductTotal(products:cartModel[]){
    return (products.reduce((total, product) => total + (product.count * product.price), 0)).toFixed(2);
  }

  getProductPrice(productPrice:number, count:number){
    return (productPrice * count).toFixed(2);
  }

  getTotal(products:cartModel[]){
    const total = products.reduce((total, product) => total + (product.count * product.price), 0);
    return (total + this.shippingCharge).toFixed(2); 
  }
}
