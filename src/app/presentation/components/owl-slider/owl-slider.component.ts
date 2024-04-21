import { Component, Input } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { assetsPath } from '../../../../environment';
import { RouterLink } from '@angular/router';
import { BrandListItemModel } from '../../../core/domain/product/brand-list-item.model';

@Component({
  selector: 'app-owl-slider',
  standalone: true,
  imports: [CarouselModule, RouterLink],
  templateUrl: './owl-slider.component.html',
  styleUrl: './owl-slider.component.scss',
})

export class OwlSliderComponent {
  assetsPath = assetsPath;
  
  @Input() slides:BrandListItemModel[] = []; 

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      600: {
        items: 3
      },
      800: {
        items: 4
      },
      1000: {
        items:5
      },
      1200: {
        items:6
      },
      1500: {
        items:7
      }
    },
    nav: true
  }

  
}
