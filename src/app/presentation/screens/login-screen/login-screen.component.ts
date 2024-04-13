import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store.state';
import { login } from '../../../store/auth/auth.action';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss'
})

export class LoginScreenComponent {

  errorMsg:string = '';

  loginForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private store:Store<AppState>){}

  OnSubmit(){
    if(this.loginForm.invalid) return;

    const Email = this.loginForm.get('email')?.value;
    const Password = this.loginForm.get('password')?.value;

    this.store.dispatch(login({username: Email, pass:Password, redirectionUrl: '/'}));
  }

}
