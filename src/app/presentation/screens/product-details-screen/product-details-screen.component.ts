import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ProductRatingComponent } from '../../components/product-rating/product-rating.component';
import { IncrDecrButtonComponent } from '../../components/incr-decr-button/incr-decr-button.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TabComponent } from '../../components/tab/tab.component';
import { TabContentComponent } from '../../components/tab-content/tab-content.component';
import { ReviewCardComponent } from '../../components/review-card/review-card.component';
import { ReviewFormComponent } from '../../components/review-form/review-form.component';
import { SectionComponent } from '../../components/section/section.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store.state';
import { addToCart, decrementProductCount, incrementProductCount } from '../../../store/cart/cart.action';
import { ProductModel } from '../../../core/domain/product/product.model';
import { getCart } from '../../../store/cart/cart.selector';
import { Observable, Subscription, of, switchMap, take, withLatestFrom } from 'rxjs';
import { ToasterService } from '../../../service/toaster.service';
import { ProductService } from '../../../service/product.service';
import { assetsPath } from '../../../../environment';
import { getAuth } from '../../../store/auth/auth.selector';
import { ReviewListItemModel } from '../../../core/domain/product/review-list-item.model';
import { AsyncPipe } from '@angular/common';
import { ProductListItemModel } from '../../../core/domain/product/product-list-item.model';
import { ShareModule } from 'ngx-sharebuttons';

@Component({
  selector: 'app-product-details-screen',
  standalone: true,
  imports: [
    BreadcrumbComponent, 
    ProductRatingComponent, 
    IncrDecrButtonComponent, 
    RouterLink, 
    TabComponent, 
    TabContentComponent, 
    ReviewCardComponent, 
    ReviewFormComponent, 
    SectionComponent, 
    ProductCardComponent,
    AsyncPipe,
    ShareModule,
  ],
  templateUrl: './product-details-screen.component.html',
  styleUrl: './product-details-screen.component.scss'
})

export class ProductDetailsScreenComponent implements OnInit, OnDestroy{

  productDetails:ProductModel = {
    _id:'',
    name:'',
    description:'',
    price:0,
    rating:0,
    noReviews:0,
    img:'',
    discount:0,
    brand:'',
    countInStock:0,
    information:'',
    category:''
  }

  cartSubscription:Subscription|undefined;
  productSubscription:Subscription|undefined;
  isProductAddedInCart:boolean = false;
  productCartCount:number = 1;

  assetsPath = assetsPath;

  storeSubcription:Subscription|undefined;
  routeSubscription:Subscription|undefined;
  isUserLogin = false;

  reviewList:Observable<ReviewListItemModel[]> | undefined;

  similarProductList:Observable<ProductListItemModel[]>|undefined;

  constructor(
    private store:Store<AppState>, 
    private toasterService:ToasterService, 
    private productService:ProductService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.storeSubcription = this.store.select(getAuth).subscribe({
      next:(authState => {
        this.isUserLogin = authState.token !== '';;
      })
    })

    this.routeSubscription = this.route.params.subscribe(routeState => {
      console.log(routeState);
      const productId = routeState['id'];
      if(productId){
        this.productService.getProductDetails(productId).pipe(take(1)).subscribe({
          next:(response => {
            this.productDetails = response;
            this.similarProductList = this.productService.getSimilarProducts(response._id, response.name, response.category);
          }),
          error:(error => {
            console.log(error);
          })
        })

        this.reviewList = this.productService.getProductReviewList(productId);
      }
    });

    this.cartSubscription =  this.store.select(getCart).pipe(
      withLatestFrom(this.route.params),
      switchMap(([cartState, params]) => {
        const product = cartState.items.find((product => product.productId === params['id']));
        if(product){
          return of({isProductAddedInCart:true, count: product.count});
        }
        return of({isProductAddedInCart:false, count: 0});
      })
    ).subscribe(productDetails => { 
      this.isProductAddedInCart = productDetails.isProductAddedInCart;
      this.productCartCount = productDetails.count;
    });
  }

  ngOnDestroy(): void {
    this.storeSubcription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }

  onIncrement(productId:string){
    this.store.dispatch(incrementProductCount({productId}));
  }

  onDecrement(productId:string){
    this.store.dispatch(decrementProductCount({productId}));
  }

  addToCart(){
    if(this.isProductAddedInCart){
      return;
    } 

    this.store.dispatch(addToCart({productId:this.productDetails._id, count:1, Image:this.productDetails.img, Name:this.productDetails.name, price:this.productDetails.price, maxCount: this.productDetails.countInStock}));
    this.toasterService.success('Proudct is added to the cart.');
  }
}
