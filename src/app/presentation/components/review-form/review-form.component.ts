import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatingInputComponent } from '../rating-input/rating-input.component';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RatingInputComponent],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss'
})

export class ReviewFormComponent {
  reviewForm:FormGroup = new FormGroup({
    rating: new FormControl('', [Validators.required]),
    review: new FormControl('', [Validators.required]),
    name:   new FormControl('', [Validators.required]),
    email:  new FormControl('', [Validators.required]),
  });

  constructor(){}
}
