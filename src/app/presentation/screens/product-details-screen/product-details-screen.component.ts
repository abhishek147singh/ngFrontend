import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ProductRatingComponent } from '../../components/product-rating/product-rating.component';
import { IncrDecrButtonComponent } from '../../components/incr-decr-button/incr-decr-button.component';
import { RouterLink } from '@angular/router';
import { TabComponent } from '../../components/tab/tab.component';
import { TabContentComponent } from '../../components/tab-content/tab-content.component';
import { ReviewCardComponent } from '../../components/review-card/review-card.component';
import { ReviewFormComponent } from '../../components/review-form/review-form.component';
import { SectionComponent } from '../../components/section/section.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-product-details-screen',
  standalone: true,
  imports: [BreadcrumbComponent, ProductRatingComponent, IncrDecrButtonComponent, RouterLink, TabComponent, TabContentComponent, ReviewCardComponent, ReviewFormComponent, SectionComponent, ProductCardComponent],
  templateUrl: './product-details-screen.component.html',
  styleUrl: './product-details-screen.component.scss'
})

export class ProductDetailsScreenComponent {

}
