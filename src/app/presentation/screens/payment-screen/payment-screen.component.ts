import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SectionComponent } from '../../components/section/section.component';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { assetsPath } from '../../../../environment';
import { getAuth } from '../../../store/auth/auth.selector';
import { getCart } from '../../../store/cart/cart.selector';
import { cartModel } from '../../../store/cart/cart.state';
import { AppState } from '../../../store/store.state';
import { ShippingAddressComponent } from '../../components/shipping-address/shipping-address.component';
import { OrderService } from '../../../service/order.service';
import { shippingAddressStateModel } from '../../../store/shipping-address/shipping-address.reducer';
import { OrderModel } from '../../../core/domain/order/order.model';

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
  shippingState: shippingAddressStateModel|undefined;
  routeSubscription:Subscription|undefined;

  OrderDetials:OrderModel|undefined;

  constructor(
    private store:Store<AppState>, 
    private router:Router,
    private orderService:OrderService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.storeSubscription = this.store.select(getAuth).subscribe(authState => {
      if(!authState.token){
        this.router.navigate(['/login'], {
          queryParams: {redirectTo:'shipping'}
        });
      }
    });

    this.routeSubscription = this.route.params.subscribe(routeState => {
      const productId = routeState['id'];
      if(productId){
        this.getOrderDetails(productId);
      }
    });
  }

  getOrderDetails(Id:string){
    this.orderService.getOrderDetails(Id).pipe(take(1)).subscribe({
      next:(response => {
        this.OrderDetials = response;

        this.cartProducts = this.OrderDetials.orderItems.map(product => {
          return {
            Name: product.name,
            count: product.quantity,
            Image: product.img,
            price: product.price,
            productId: product.product
          }
        });

        const shipingAddress = this.OrderDetials.shippingAddress;

        this.shippingState = {
          fName: shipingAddress.fullName.split(' ')[0],
          lName: shipingAddress.fullName.split(' ')[1],
          address1: shipingAddress.address,
          city: shipingAddress.city,
          country: shipingAddress.country,
          zip: shipingAddress.zipcode,
          state: shipingAddress.state,
          email: shipingAddress.email,
          mobile: shipingAddress.mobile
        }
      }),
      error:(error => {
        console.log(error);
      })
    })
  }

  ngOnDestroy(): void {
    this.storeSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
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
