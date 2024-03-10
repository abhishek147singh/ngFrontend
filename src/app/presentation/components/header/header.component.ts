import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations:[
    trigger('expandPanel', [
      state('collapsed', style({ height: '0'})),
      state('expanded', style({ height: '*'})),
      transition('collapsed <=> expanded',
        animate('300ms ease-in-out'),
      ),
    ]),

    trigger('expandPannelIcon', [
      state('collapsed', style({ transform: 'rotate(0deg)'})),
      state('expanded', style({ transform: 'rotate(180deg)'})),
      transition('collapsed <=> expanded',
        animate('300ms ease-in-out'),
      ),
    ])
  ],
})

export class HeaderComponent {
  isCategoryDropDownActive:boolean = false;
  isHeader2Opened:boolean = false;

}
