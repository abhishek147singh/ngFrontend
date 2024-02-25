import { Component } from '@angular/core';

@Component({
  selector: 'app-rating-input',
  standalone: true,
  imports: [],
  templateUrl: './rating-input.component.html',
  styleUrl: './rating-input.component.scss'
})
export class RatingInputComponent {
  rating:number = 0;

  setRating(rating:number){
    this.rating = rating;
  }
}
