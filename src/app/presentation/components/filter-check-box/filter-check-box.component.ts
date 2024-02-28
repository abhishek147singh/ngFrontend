import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'app-filter-check-box',
  standalone: true,
  imports: [],
  templateUrl: './filter-check-box.component.html',
  styleUrl: './filter-check-box.component.scss'
})

export class FilterCheckBoxComponent {
 isSelected:boolean = false;

 @Input() lableText:string = '';

 @Input() noProducts:number = 0;

  @Output() onSelectEmt = new EventEmitter<boolean> ();

  onSelect(){
    this.isSelected = !this.isSelected;

    this.onSelectEmt.emit(this.isSelected);
  }
}
