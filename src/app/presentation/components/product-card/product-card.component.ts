import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductRatingComponent } from '../product-rating/product-rating.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ProductRatingComponent, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})

export class ProductCardComponent {
  @Input() productDetails = {name:'Product Name Goes Here', actualPrice:2000, crossPrice:3000, rating:4.5, id:'1', image:'../../../../assets/img/product-1.jpg'};
  @Output() addToCartEmt = new EventEmitter<{ productId:string; Image:string; Name:string; price:number; count:number;}> ();

  onAddToCart(){
    this.addToCartEmt.emit({productId:this.productDetails.name, Image:this.productDetails.image, Name:this.productDetails.name, price:this.productDetails.actualPrice, count:1});
  }
}
