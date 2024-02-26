import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './contact-us-form.component.html',
  styleUrl: './contact-us-form.component.scss'
})
export class ContactUsFormComponent {
  contactUsForm = new FormGroup({
    'Name': new FormControl('', [Validators.required]),    
    'Email': new FormControl('', [Validators.required]),    
    'Subject': new FormControl('', [Validators.required]),    
    'Message': new FormControl('', [Validators.required]),    
  })
}
