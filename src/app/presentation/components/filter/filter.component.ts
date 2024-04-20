import { UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterCheckBoxComponent } from '../filter-check-box/filter-check-box.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [UpperCasePipe, FilterCheckBoxComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})

export class FilterComponent implements OnInit{
  @Input() heading:string = 'filter by price';
  @Input() isMultiLevel:boolean = false;
  @Input() initialSelectedValues:string[] = [];
  @Input() filterInputs:{
    label:string;
    value:string;
    noProducts:number;
  }[] = [];

  selectedInputs:{
    [index:number]:boolean
  } = {};

  ngOnInit(): void {
    this.initialSelectedValues.forEach(value => {
      const index = this.filterInputs.findIndex(v => v.value === value);
      this.selectedInputs[index] = true;
    })
  }

  @Output() onSelectEmt = new EventEmitter<string[]> ();

  onSelect(value:string, index:number){
    if(this.isMultiLevel){
      this.selectedInputs[index] = !this.selectedInputs[index];
      const selectValues = this.filterInputs.filter((value,i)=> this.selectedInputs[i]).map(value => value.value); 
      this.onSelectEmt.emit(selectValues);
    }else{
      if(this.selectedInputs[index]){
        Object.keys(this.selectedInputs).forEach((i:any) => {
          this.selectedInputs[i] = false;
        });
        this.onSelectEmt.emit([]);  
      }else{
        Object.keys(this.selectedInputs).forEach((i:any) => {
          this.selectedInputs[i] = false;
        });
        this.selectedInputs[index] = true;
        this.onSelectEmt.emit([value]);
      }
    } 
  }
}
