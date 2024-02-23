import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-product-details-screen',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './product-details-screen.component.html',
  styleUrl: './product-details-screen.component.scss'
})

export class ProductDetailsScreenComponent {

}
