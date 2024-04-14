import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatingInputComponent } from '../rating-input/rating-input.component';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { ToasterService } from '../../../service/toaster.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,RatingInputComponent, RouterLink],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss'
})

export class ReviewFormComponent implements OnInit , OnDestroy{
  reviewForm:FormGroup = new FormGroup({
    rating: new FormControl(0, [Validators.required]),
    review: new FormControl('', [Validators.required]),
  });

  @Input() productId:string = '';
  isSavingReview:boolean = false;

  constructor(private productService:ProductService,private toasterService:ToasterService){}

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {

  }

  onRatingChange(rating:number){
    this.reviewForm.patchValue({
      rating:rating
    });
  }

  onSubmit(){
    if(this.reviewForm.valid && this.productId && !this.isSavingReview){
      const rating = this.reviewForm.get('rating')?.value;
      const review = this.reviewForm.get('review')?.value;
      this.isSavingReview = true;

      this.productService.saveReview(rating, review, this.productId).pipe(take(1)).subscribe({
        next:(response => {
          this.isSavingReview = false;
          this.toasterService.success('Your Review saved!!');
        }),
        error:(error => {
          this.isSavingReview = false;
          this.toasterService.error('Something went wrong!!');
        })
      })
    }
  }

}
