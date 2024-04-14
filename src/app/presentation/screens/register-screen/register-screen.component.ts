import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { Subscription, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store.state';
import { register } from '../../../store/auth/auth.action';
import { getAuth } from '../../../store/auth/auth.selector';

@Component({
  selector: 'app-register-screen',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './register-screen.component.html',
  styleUrl: './register-screen.component.scss'
})

export class RegisterScreenComponent implements OnInit, OnDestroy{
  errorMsg:string = '';
  registerForm:FormGroup = new FormGroup({
    'name':new FormControl('', [Validators.required]),
    'email':new FormControl('', [Validators.required]),
    'password':new FormControl('', [Validators.required]),
    'confirmPassword':new FormControl('', [Validators.required]),
  });

  storeSubscription:Subscription|undefined;

  constructor(private authService:AuthService, private store:Store<AppState>){}

  ngOnInit(): void {
    this.storeSubscription = this.store.select(getAuth).subscribe(authState => {
      this.errorMsg = authState.error;
    })
  }

  ngOnDestroy(): void {
    this.storeSubscription?.unsubscribe();
  }

  register(){
    if(this.registerForm.invalid) return;

    const name = this.registerForm.get('name')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if(password !== confirmPassword){
      this.errorMsg = 'Password and Confirm password should be same.';
      return;
    }

    this.store.dispatch(register({username: name, email:email, pass:password, redirectionUrl:'/'}));
  }
}
