import { Component, Input } from '@angular/core';
import { ProductRatingComponent } from '../product-rating/product-rating.component';
import { ReviewListItemModel } from '../../../core/domain/product/review-list-item.model';
import { assetsPath } from '../../../../environment';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [ProductRatingComponent],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss'
})
export class ReviewCardComponent {
  @Input() reviewModel:ReviewListItemModel = {
    _id:'',
    rating:0,
    review:'',
    userName:'',
    userProfile:'./../../.././../assets/img/user.jpg',
    date:''
  } 

  assetsPath:string = assetsPath;

  getFirstLetter(str:string){
    const trimString = str.trim();
    const firstWord = trimString.at(0);
    if(firstWord) return firstWord;

    return '';
  }
}
