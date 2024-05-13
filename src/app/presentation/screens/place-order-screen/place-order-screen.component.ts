import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { assetsPath } from '../../../../environment';
import { getAuth } from '../../../store/auth/auth.selector';
import { getCart } from '../../../store/cart/cart.selector';
import { cartModel } from '../../../store/cart/cart.state';
import { AppState } from '../../../store/store.state';
import { SectionComponent } from '../../components/section/section.component';
import { ShippingAddressComponent } from '../../components/shipping-address/shipping-address.component';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { PaymentScreenComponent } from '../payment-screen/payment-screen.component';
import { shippingAddressStateModel } from '../../../store/shipping-address/shipping-address.reducer';
import { getShippingAdd } from '../../../store/shipping-address/shipping-address.selector';
import { OrderService } from '../../../service/order.service';
import { ToasterService } from '../../../service/toaster.service';
import { clearCart, validateCart } from '../../../store/cart/cart.action';

@Component({
  selector: 'app-place-order-screen',
  standalone: true,
  imports: [StepperComponent, SectionComponent, RouterLink, PaymentScreenComponent, ShippingAddressComponent],
  templateUrl: './place-order-screen.component.html',
  styleUrl: './place-order-screen.component.scss'
})
export class PlaceOrderScreenComponent implements OnInit, OnDestroy {
  steps = [
    { title:'signin', isSuccess:true},
    { title:'shipping', isSuccess:true},
    { title:'payment', isSuccess:false},
    { title:'place order', isSuccess:false},
  ];

  cartSubscription:Subscription|undefined;
  productCartCount:number = 1;

  shipingStoreSubscription:Subscription|undefined;
  shippingState: shippingAddressStateModel|undefined;

  assetsPath = assetsPath;

  cartProducts:cartModel[] = [];

  shippingCharge:number = 0;

  storeSubscription:Subscription|undefined;

  constructor(private store:Store<AppState>, private router:Router, private orderService:OrderService, private toasterService:ToasterService){}

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

    this.shipingStoreSubscription = this.store.select(getShippingAdd).subscribe(shippingState => {
      this.shippingState = shippingState;
    });  

    this.store.dispatch(validateCart({productIds: this.cartProducts.map(p => p.productId)}));
  }

  ngOnDestroy(): void {
    this.storeSubscription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
    this.shipingStoreSubscription?.unsubscribe();
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

  placeOrder(){
    if(this.cartProducts && this.shippingState){
      const orderItems = this.cartProducts.map(product => {
        return {
          name: product.Name,
          quantity: product.count,
          img: product.Image,
          price: product.price,
          product: product.productId
        }
      });

      const shippingAddress = {
        fullName: this.shippingState.fName + ' ' + this.shippingState.lName, 
        address: this.shippingState.address1,
        city: this.shippingState.city,
        zipcode: this.shippingState.zip,
        country: this.shippingState.country,
        state: this.shippingState.state,
        mobile: this.shippingState.mobile,
        email: this.shippingState.email
      };
      

      const itemsPrice = this.cartProducts.reduce((total, product) => total + (product.count * product.price), 0);
      const totalPrice = itemsPrice + this.shippingCharge; 

      const OrderModel = {
        orderItems : orderItems,
        shippingAddress:shippingAddress,
        paymentMethod: 'Not Specified',
        itemsPrice: itemsPrice,
        shippingPrice: this.shippingCharge,
        taxPrice:0,
        totalPrice:totalPrice,
      };

      this.orderService.placeOrder(OrderModel).pipe(take((1))).subscribe({
        next:(orderId => {
          this.toasterService.success('Order is created!!');
          this.store.dispatch(clearCart());
          this.router.navigate(['/', 'payment', orderId]);
        }),
        error:(error => {
          this.toasterService.error('Order is not created!!');
        })
      })
    }
  }
}
