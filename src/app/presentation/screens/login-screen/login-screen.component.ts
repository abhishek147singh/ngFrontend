import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { RouterLink } from '@angular/router';

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

  constructor(private authService:AuthService){}

  OnSubmit(){
    if(this.loginForm.invalid) return;

    const Email = this.loginForm.get('email')?.value;
    const Password = this.loginForm.get('password')?.value;

    if(Email && Password){
      this.authService.login(Email, Password).subscribe({
        next:(response => {

        }),
        error:(error => {
          this.errorMsg = error.message;
        })
      })
    }



    // this.authService.login(Email, Password);

  }

}
