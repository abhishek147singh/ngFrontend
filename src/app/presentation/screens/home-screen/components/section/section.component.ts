import { UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})

export class SectionComponent {
  @Input() title:string = '';


}
