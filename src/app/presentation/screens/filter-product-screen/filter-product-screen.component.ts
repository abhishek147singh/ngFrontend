import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-filter-product-screen',
  standalone: true,
  imports: [BreadcrumbComponent, ProductCardComponent, PaginationComponent],
  templateUrl: './filter-product-screen.component.html',
  styleUrl: './filter-product-screen.component.scss'
})

export class FilterProductScreenComponent {

}
