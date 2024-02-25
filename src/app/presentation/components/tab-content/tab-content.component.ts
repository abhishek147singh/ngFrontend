import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab-content',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './tab-content.component.html',
  styleUrl: './tab-content.component.scss',
  animations:[
    trigger('showAndHide', [
      state('show',style({
        'opacity':1
      })),
      state('hide',style({
        'opacity':0
      })),
      transition('show => hide', animate('1500ms ease-in-out')),
      transition('hide => show',  animate('300ms 150ms ease-in-out'))
    ])
  ]
})
export class TabContentComponent {
  @Input() isActive:boolean = false;
  @Input() title:string = 'Tab Title';
}
