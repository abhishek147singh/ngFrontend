import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { SectionComponent } from './components/section/section.component';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { FreaturCardComponent } from '../../components/freatur-card/freatur-card.component';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [HeaderComponent,FooterComponent, ProductCardComponent, SliderComponent, SectionComponent,CategoryCardComponent,FreaturCardComponent],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss'
})

export class HomeScreenComponent {

}
