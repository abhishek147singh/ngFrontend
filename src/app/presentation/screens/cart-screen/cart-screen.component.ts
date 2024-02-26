import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { IncrDecrButtonComponent } from '../../components/incr-decr-button/incr-decr-button.component';

@Component({
  selector: 'app-cart-screen',
  standalone: true,
  imports: [BreadcrumbComponent,IncrDecrButtonComponent],
  templateUrl: './cart-screen.component.html',
  styleUrl: './cart-screen.component.scss'
})
export class CartScreenComponent {

}
