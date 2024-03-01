import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-address-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './shipping-address-form.component.html',
  styleUrl: './shipping-address-form.component.scss'
})
export class ShippingAddressFormComponent {
  shippingForm = new FormGroup({
    fName: new FormControl('', [Validators.required]),
    lName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required]),
    address1: new FormControl('', [Validators.required]),
    address2: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required])
  });

  onSubmit(){

  }
}
