import { Component, OnDestroy, OnInit } from '@angular/core';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { SectionComponent } from '../../components/section/section.component';
import { ShippingAddressFormComponent } from '../../components/shipping-address-form/shipping-address-form.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store.state';
import { getAuth } from '../../../store/auth/auth.selector';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { assetsPath } from '../../../../environment';

@Component({
  selector: 'app-shipping-screen',
  standalone: true,
  imports: [StepperComponent, SectionComponent, ShippingAddressFormComponent, RouterLink],
  templateUrl: './shipping-screen.component.html',
  styleUrl: './shipping-screen.component.scss'
})

export class ShippingScreenComponent implements OnInit, OnDestroy {
  steps = [
    { title:'signin', isSuccess:true},
    { title:'shipping', isSuccess:true},
    { title:'payment', isSuccess:false},
    { title:'place order', isSuccess:false},
  ];

  productCartCount:number = 1;

  assetsPath = assetsPath;

  storeSubscription:Subscription|undefined;
  constructor(private store:Store<AppState>, private router:Router){}

  ngOnInit(): void {
    this.storeSubscription = this.store.select(getAuth).subscribe(authState => {
      if(!authState.token){
        this.router.navigate(['/login'], {
          queryParams: {redirectTo:'shipping'}
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription?.unsubscribe();
  }

  afterFormSubmit(){
    this.router.navigate(['/', 'place-order']);
  }
}
