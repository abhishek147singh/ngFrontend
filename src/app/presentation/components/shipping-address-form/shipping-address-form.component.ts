import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../store/store.state';
import { getShippingAdd } from '../../../store/shipping-address/shipping-address.selector';
import { shippingAddressStateModel } from '../../../store/shipping-address/shipping-address.reducer';
import { updateShippingAddress } from '../../../store/shipping-address/shipping-address.action';

@Component({
  selector: 'app-shipping-address-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './shipping-address-form.component.html',
  styleUrl: './shipping-address-form.component.scss'
})
export class ShippingAddressFormComponent implements OnInit, OnDestroy {

  shippingForm:FormGroup = new FormGroup({
    fName: new FormControl('', [Validators.required]),
    lName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required]),
    address1: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required])
  });

  shipingStoreSubscription:Subscription|undefined;

  @Output() afterSubmit = new EventEmitter<void> ();

  constructor(private store:Store<AppState>){}

  ngOnInit(): void {
    this.shipingStoreSubscription = this.store.select(getShippingAdd).subscribe(shippingState => {
      this.shippingForm.patchValue({
        fName: shippingState.fName,
        lName: shippingState.lName,
        email: shippingState.email,
        mobile: shippingState.mobile,
        address1: shippingState.address1,
        city: shippingState.city,
        country: shippingState.country,
        state: shippingState.state,
        zip: shippingState.zip,
      })
    })
  }

  ngOnDestroy(): void {
    this.shipingStoreSubscription?.unsubscribe();
  }

  onSubmit(){
    if(!this.shippingForm.valid) return
    
    const fName = this.shippingForm.get('fName')?.value;
    const lName = this.shippingForm.get('lName')?.value;
    const email = this.shippingForm.get('email')?.value;
    const mobile = this.shippingForm.get('mobile')?.value;
    const address1 = this.shippingForm.get('address1')?.value;
    const city = this.shippingForm.get('city')?.value;
    const country = this.shippingForm.get('country')?.value;
    const state = this.shippingForm.get('state')?.value;
    const zip = this.shippingForm.get('zip')?.value;

    const shipingState:shippingAddressStateModel = {
      fName,
      lName,
      email,
      mobile,
      address1,
      city,
      country,
      state,
      zip
    }

    this.store.dispatch(updateShippingAddress({model:shipingState}));
    this.afterSubmit.emit();
  }
}
