import { Component } from '@angular/core';
import { StepperComponent } from '../../components/stepper/stepper.component';

@Component({
  selector: 'app-shipping-screen',
  standalone: true,
  imports: [StepperComponent],
  templateUrl: './shipping-screen.component.html',
  styleUrl: './shipping-screen.component.scss'
})

export class ShippingScreenComponent {
  steps = [
    { title:'signin', isSuccess:true},
    { title:'shipping', isSuccess:true},
    { title:'payment', isSuccess:false},
    { title:'place order', isSuccess:false},
  ]
}
