import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-rating',
  standalone: true,
  imports: [],
  templateUrl: './product-rating.component.html',
  styleUrl: './product-rating.component.scss'
})

export class ProductRatingComponent {
  @Input() rating:number = 0;
  @Input() noReviews:number = 0;
}
