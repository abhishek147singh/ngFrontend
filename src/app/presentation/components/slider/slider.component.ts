import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [NgClass],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})

export class SliderComponent {
  @Input() slides = [
    {
      image:'./../../../../assets/img/carousel-1.jpg',
      title:'Men Fashion',
      description:'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam Sadips duo stet amet amet ndiam elitr ipsum diam',
      category:''
    },
    {
      image:'./../../../../assets/img/carousel-2.jpg',
      title:'Women Fashion',
      description:'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam Sadips duo stet amet amet ndiam elitr ipsum diam',
      category:''
    },
    {
      image:'./../../../../assets/img/carousel-3.jpg',
      title:'Kids Fashion',
      description:'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam Sadips duo stet amet amet ndiam elitr ipsum diam',
      category:''
    },
  ]

  activeSlide:number = 0;

  searchCategory(category:string){

  }
}
