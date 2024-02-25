import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-cart-screen',
  standalone: true,
  imports: [BreadcrumbComponent],
  templateUrl: './cart-screen.component.html',
  styleUrl: './cart-screen.component.scss'
})
export class CartScreenComponent {

}
