import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss'
})

export class HomeScreenComponent {

}
