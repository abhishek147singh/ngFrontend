import { UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FilterCheckBoxComponent } from '../filter-check-box/filter-check-box.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [UpperCasePipe, FilterCheckBoxComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})

export class FilterComponent {
  @Input() heading:string = 'filter by price';

}
