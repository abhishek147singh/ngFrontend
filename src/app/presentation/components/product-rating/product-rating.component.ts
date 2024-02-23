import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-rating',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './product-rating.component.html',
  styleUrl: './product-rating.component.scss'
})

export class ProductRatingComponent {
  @Input() rating:number = 0;
  @Input() noReviews:number = 0;
  @Input() xPostion:string = '';
  @Input() reviewWithText:boolean = false;
}
