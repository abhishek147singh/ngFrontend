import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-menu',
  standalone: true,
  imports: [NgClass],
  templateUrl: './toggle-menu.component.html',
  styleUrl: './toggle-menu.component.scss'
})

export class ToggleMenuComponent implements OnInit{
  selectedValue = '';
  isOpen:boolean = false;
  @Output() onChange = new EventEmitter<string>();
  @Input() initialValue:string = '';
  @Input() optionList:{
    value:string;
    title:string;
  }[] = [];

  ngOnInit(): void {
    this.selectedValue = this.initialValue;
  }

  onSelect(value:string){
    const option = this.optionList.find(option => option.value === value);
    if(option){
      this.selectedValue = option.title;
    }
    this.onChange.emit(value);
    this.isOpen = false;
  }
}
