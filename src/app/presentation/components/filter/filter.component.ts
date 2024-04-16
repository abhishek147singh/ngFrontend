import { UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() isMultiLevel:boolean = false;
  @Input() filterInputs:{
    label:string;
    value:string;
    noProducts:number;
  }[] = [];

  selectedInputs:{
    [index:number]:boolean
  } = {};

  @Output() onSelectEmt = new EventEmitter<string[]> ();

  onSelect(value:string, index:number){
    if(this.isMultiLevel){
      this.selectedInputs[index] = !this.selectedInputs[index];
      const selectValues = this.filterInputs.filter((value,i)=> this.selectedInputs[i]).map(value => value.value); 
      this.onSelectEmt.emit(selectValues);
    }else{
      Object.keys(this.selectedInputs).forEach((i:any) => {
        this.selectedInputs[i] = false;
      });
      this.selectedInputs[index] = true;
      this.onSelectEmt.emit([value]);
    } 
  }
}
