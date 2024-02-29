import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [NgClass],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})

export class StepperComponent {

  @Input() currentStep:number = 0;
  @Input() steps:{ isSuccess:boolean; title:string }[] = [];
}
