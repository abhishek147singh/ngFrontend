import { Component } from '@angular/core';
import { ProductRatingComponent } from '../product-rating/product-rating.component';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [ProductRatingComponent],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss'
})
export class ReviewCardComponent {

}
