import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ProductRatingComponent } from '../../components/product-rating/product-rating.component';
import { IncrDecrButtonComponent } from '../../components/incr-decr-button/incr-decr-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details-screen',
  standalone: true,
  imports: [BreadcrumbComponent, ProductRatingComponent, IncrDecrButtonComponent, RouterLink],
  templateUrl: './product-details-screen.component.html',
  styleUrl: './product-details-screen.component.scss'
})

export class ProductDetailsScreenComponent {

}
