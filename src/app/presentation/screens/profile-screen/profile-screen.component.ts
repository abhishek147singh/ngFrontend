import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../service/auth.service';
import { updateProfile } from '../../../store/auth/auth.action';
import { getAuth } from '../../../store/auth/auth.selector';
import { AppState } from '../../../store/store.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-screen',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './profile-screen.component.html',
  styleUrl: './profile-screen.component.scss'
})

export class ProfileScreenComponent implements OnInit, OnDestroy{
    errorMsg:string = '';
    loading:boolean = false;
    profileForm:FormGroup = new FormGroup({
      'name':new FormControl('', [Validators.required]),
      'email':new FormControl('', [Validators.required]),
      'password':new FormControl('', []),
      'confirmPassword':new FormControl('', []),
    });
  
    storeSubscription:Subscription|undefined;
  
    constructor(private store:Store<AppState>, private router:Router){}
  
    ngOnInit(): void {
      this.storeSubscription = this.store.select(getAuth).subscribe(authState => {
        this.errorMsg = authState.error;
        this.loading = authState.loading;

        if(!authState.token){
          this.router.navigate(['/', 'login']);
        }

        this.profileForm.patchValue({
          name:authState.name,
          email:authState.email
        })
      });
    }
  
    ngOnDestroy(): void {
      this.storeSubscription?.unsubscribe();
    }
  
    update(){
      if(this.profileForm.invalid) return;
  
      const name = this.profileForm.get('name')?.value;
      const email = this.profileForm.get('email')?.value;
      const password = this.profileForm.get('password')?.value;
      const confirmPassword = this.profileForm.get('confirmPassword')?.value;
  
      if(password !== confirmPassword){
        this.errorMsg = 'Password and Confirm password should be same.';
        return;
      }
  
      this.store.dispatch(updateProfile({username: name, email:email, pass:password}));
    }
}
