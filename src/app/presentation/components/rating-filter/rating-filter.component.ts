import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating-filter',
  standalone: true,
  imports: [NgClass],
  templateUrl: './rating-filter.component.html',
  styleUrl: './rating-filter.component.scss'
})
export class RatingFilterComponent implements OnInit{
  @Input() initialSelectedValues:string = '';
  @Output() onSelectEmt = new EventEmitter<number> ();
  @Input() initialRating:string = 'all';

  selectedValue:number = 0;
  isOpen:boolean = false;

  ngOnInit(): void {
    if(this.initialRating !== 'all'){
      this.selectedValue = Number(this.initialRating);
    }
    
  }

  onSelect(value:number){
    this.selectedValue = value;
    console.log(value, this.selectedValue);
    this.isOpen = false;
    this.onSelectEmt.emit(value);
  }
}
