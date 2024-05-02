import { Component, Input} from '@angular/core';
import { shippingAddressStateModel } from '../../../store/shipping-address/shipping-address.reducer';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss'
})
export class ShippingAddressComponent {
  @Input() shippingState: shippingAddressStateModel|undefined;
}
