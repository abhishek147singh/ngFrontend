import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rating-input',
  standalone: true,
  imports: [],
  templateUrl: './rating-input.component.html',
  styleUrl: './rating-input.component.scss'
})
export class RatingInputComponent {
  rating:number = 0;
  @Output() onChangeEmt = new EventEmitter<number> ();

  setRating(rating:number){
    this.rating = rating;
    this.onChangeEmt.emit(rating);
  }
}
