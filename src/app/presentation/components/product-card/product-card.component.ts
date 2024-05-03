import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductRatingComponent } from '../product-rating/product-rating.component';
import { Router, RouterLink } from '@angular/router';
import { ProductListItemModel } from '../../../core/domain/product/product-list-item.model';
import { assetsPath } from '../../../../environment';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ProductRatingComponent, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})

export class ProductCardComponent {

  assetsPath = assetsPath;

  @Input() productDetails:ProductListItemModel = {
    _id:'',
    name:'',
    price:0,
    rating:0,
    reviews:0,
    discount:0,
    img:'',
    noReviews:0
  };

  constructor(private router:Router){}

  @Output() addToCartEmt = new EventEmitter<{ productId:string; Image:string; Name:string; price:number; count:number;}> ();

  onAddToCart(){
    this.addToCartEmt.emit({productId:this.productDetails._id, Image:this.productDetails.img, Name:this.productDetails.name, price:this.getActualPrice(this.productDetails.price, this.productDetails.discount) , count:1});
  }

  getActualPrice(price:number, discount:number){
    return (price - (price * (discount/100)));
  }

  search(query:string){
    this.router.navigate(['/', 'shop'], {
      queryParams:{ query }
    });
  }
}
