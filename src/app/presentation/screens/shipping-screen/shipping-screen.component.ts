import { Component } from '@angular/core';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { SectionComponent } from '../../components/section/section.component';
import { ShippingAddressFormComponent } from '../../components/shipping-address-form/shipping-address-form.component';

@Component({
  selector: 'app-shipping-screen',
  standalone: true,
  imports: [StepperComponent, SectionComponent, ShippingAddressFormComponent],
  templateUrl: './shipping-screen.component.html',
  styleUrl: './shipping-screen.component.scss'
})

export class ShippingScreenComponent {
  steps = [
    { title:'signin', isSuccess:true},
    { title:'shipping', isSuccess:true},
    { title:'payment', isSuccess:false},
    { title:'place order', isSuccess:false},
  ];

 
}
