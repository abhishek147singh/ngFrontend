import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'app-filter-check-box',
  standalone: true,
  imports: [],
  templateUrl: './filter-check-box.component.html',
  styleUrl: './filter-check-box.component.scss'
})

export class FilterCheckBoxComponent {
  @Input() isSelected:boolean = false;
  @Input() lableText:string = '';
  @Input() noProducts:number = 0;
  @Input() value:string = '';

  @Output() onSelectEmt = new EventEmitter<string> ();

  onSelect(){
    this.onSelectEmt.emit(this.value);
  }
}
