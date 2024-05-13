import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { IncrDecrButtonComponent } from '../../components/incr-decr-button/incr-decr-button.component';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ToasterService } from '../../../service/toaster.service';
import { incrementProductCount, decrementProductCount, removeToCart, validateCart } from '../../../store/cart/cart.action';
import { getCart } from '../../../store/cart/cart.selector';
import { AppState } from '../../../store/store.state';
import { cartModel } from '../../../store/cart/cart.state';
import { assetsPath } from '../../../../environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-screen',
  standalone: true,
  imports: [BreadcrumbComponent,IncrDecrButtonComponent],
  templateUrl: './cart-screen.component.html',
  styleUrl: './cart-screen.component.scss'
})

export class CartScreenComponent {

  cartSubscription:Subscription|undefined;
  productCartCount:number = 1;

  assetsPath = assetsPath;

  cartProducts:cartModel[] = [];

  constructor(private store:Store<AppState>, private toasterService:ToasterService, private router:Router){}

  ngOnInit(): void {
    this.cartSubscription = this.store.select(getCart).subscribe((cartState => {
        this.cartProducts = cartState.items; 
    }));

    this.store.dispatch(validateCart({productIds: this.cartProducts.map(p => p.productId)}));
  }

  ngOnDestroy(): void {
    
  }

  onIncrement(productId:string){
    this.store.dispatch(incrementProductCount({productId}));
  }

  onDecrement(productId:string){
    this.store.dispatch(decrementProductCount({productId}));
  }

  onRemove(productId:string){
    this.store.dispatch(removeToCart({productId}));
  }

  getProductTotal(products:cartModel[]){
    return (products.reduce((total, product) => total + (product.count * product.price), 0)).toFixed(2);
  }

  getProductPrice(productPrice:number, count:number){
    return (productPrice * count).toFixed(2);
  }

  proccedToCheckout(){
    this.router.navigate(['/', 'shipping']);
  }
}
