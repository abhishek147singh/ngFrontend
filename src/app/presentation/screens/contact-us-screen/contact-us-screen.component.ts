import { Component } from '@angular/core';
import { SectionComponent } from '../../components/section/section.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactUsFormComponent } from '../../components/contact-us-form/contact-us-form.component';

@Component({
  selector: 'app-contact-us-screen',
  standalone: true,
  imports: [SectionComponent, BreadcrumbComponent, FormsModule, ReactiveFormsModule, ContactUsFormComponent],
  templateUrl: './contact-us-screen.component.html',
  styleUrl: './contact-us-screen.component.scss'
})
export class ContactUsScreenComponent {
  contactUsForm = new FormGroup({
    'Name': new FormControl('', [Validators.required]),    
    'Email': new FormControl('', [Validators.required]),    
    'Subject': new FormControl('', [Validators.required]),    
    'Message': new FormControl('', [Validators.required]),    
  })
}
