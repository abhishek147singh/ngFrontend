import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
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

export class LoginScreenComponent implements OnInit{

  errorMsg:string = '';

  loginForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  redirectTo:string = '/';

  constructor(private store:Store<AppState>, private route: ActivatedRoute){}

  ngOnInit(): void {
    const redirectionUrl = this.route.snapshot.queryParams['redirectTo'];
    if(redirectionUrl){
      this.redirectTo = redirectionUrl;
    }
  }

  OnSubmit(){
    if(this.loginForm.invalid) return;

    const Email = this.loginForm.get('email')?.value;
    const Password = this.loginForm.get('password')?.value;

    this.store.dispatch(login({username: Email, pass:Password, redirectionUrl: this.redirectTo}));
  }

}
