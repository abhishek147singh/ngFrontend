import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { BackToTopComponent } from '../../components/back-to-top/back-to-top.component';

@Component({
  selector: 'app-filter-product-screen',
  standalone: true,
  imports: [BreadcrumbComponent, ProductCardComponent, PaginationComponent, FilterComponent, BackToTopComponent],
  templateUrl: './filter-product-screen.component.html',
  styleUrl: './filter-product-screen.component.scss'
})

export class FilterProductScreenComponent {

}
