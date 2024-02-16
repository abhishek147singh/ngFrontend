import { Component } from '@angular/core';
import { ProductRatingComponent } from '../product-rating/product-rating.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ProductRatingComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

}
