import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [],
  templateUrl: './back-to-top.component.html',
  styleUrl: './back-to-top.component.scss'
})
export class BackToTopComponent {

  @HostListener('window:scroll',['$event']) onScroll(){
    const shrinkHeader = 250;
    const scrollYPos = document.documentElement.scrollTop;

    if(this.button){
      if(scrollYPos >= shrinkHeader){
        this.renderer.addClass(this.button.nativeElement , 'show');
      }else{
        this.renderer.removeClass(this.button.nativeElement, 'show');
      }
    }
  }

  @ViewChild('btn') button:ElementRef|undefined;

  constructor(private renderer:Renderer2){}

  backToTop(){
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}
