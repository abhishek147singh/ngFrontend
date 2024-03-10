import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-register-screen',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './register-screen.component.html',
  styleUrl: './register-screen.component.scss'
})

export class RegisterScreenComponent {
  errorMsg:string = '';
  registerForm:FormGroup = new FormGroup({
    'name':new FormControl('', [Validators.required]),
    'email':new FormControl('', [Validators.required]),
    'password':new FormControl('', [Validators.required]),
    'confirmPassword':new FormControl('', [Validators.required]),
  });

  constructor(private authService:AuthService){}

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

    this.authService.register(name, email, password).pipe(take(1)).subscribe({
      next:(response => {

      }),
      error:(error => {
        this.errorMsg = error.message;
      })
    })
  }
}
