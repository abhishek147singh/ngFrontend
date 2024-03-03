import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-card-slider',
  standalone: true,
  imports: [NgIf, NgFor, NgStyle, NgClass],
  templateUrl: './image-card-slider.component.html',
  styleUrl: './image-card-slider.component.scss'
})
export class ImageCardSliderComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  currentSlideIndex:number = 0;
  noSlides:number = 0;

  translateValue:number = 0;

  isDown = false;
  startX = 0;
  scrollLeft = 0;
  prevTranslateValue = 0;

  screenWidth:number = 0;
  slideWidth:number = 220;
  slideOffsetX:number = 230;
  slideHeight:number = 350;

  sliderWidth:number = 0;

  // firstSlide:SliderModel|undefined;
  // lastSlide:SliderModel|undefined;

  removeEvents: (() => void) | undefined;

  @ViewChild('slider') slider!:ElementRef;

  constructor(){}

  ngOnInit(): void {
    // if(isPlatformBrowser(this.platformId)){
      this.screenWidth = window.innerWidth; 
    // }

    // this.firstSlide = this.slides.at(0);
    // this.lastSlide  = this.slides.at(-1);
  }

  ngAfterViewInit(): void {
    if(this.slider){
      
      this.sliderWidth = this.slider.nativeElement.offsetWidth;
      console.log('slider width', this.sliderWidth);

      const start = (e:any) => {
        this.prevTranslateValue = this.translateValue;
        this.isDown = true;
        if(e.type === 'touchstart'){
          this.startX = e.touches[0].pageX - this.slider.nativeElement.offsetLeft;
        }else{
          this.startX = e.pageX
        }
        if(this.slider)
          this.scrollLeft = this.slider.nativeElement.scrollLeft;	
      }
      
      const move = (e:any) => {
        if(!this.isDown) return;
        e.preventDefault();
        let x = 0;

        if(e.type === 'touchmove'){
          x = e.touches[0].pageX - this.slider.nativeElement.offsetLeft
        }else{
          x = e.pageX;
        }

        const dist = (x - this.startX);
        this.translateValue = this.prevTranslateValue - (this.scrollLeft - dist);
        
      }

      const end = (e:any) => {
        if(!this.isDown) return;
        this.isDown = false;
 
        let x = 0;
        if(e.type === 'touchend'){
          x = e.changedTouches[0].pageX - this.slider.nativeElement.offsetLeft;
        }else{
          x = e.pageX;
        }

        const dist = (x - this.startX);
        const delta = this.scrollLeft - dist;
        const thresold = 100;


        const noCardHasPass = Math.floor(dist/this.slideWidth);
    
        // this.translateValue = this.prevTranslateValue + (noCardHasPass * this.slideWidth) + 40;

        if(delta > thresold){
          this.nextSlide();
        }else if(delta < -thresold){
          this.prevSlide();
        }else{
          this.translateValue = this.prevTranslateValue;
        }
      }
      
      (() => {
        this.slider.nativeElement.addEventListener('touchstart', start);
        this.slider.nativeElement.addEventListener('mousedown', start);
    
        this.slider.nativeElement.addEventListener('touchmove', move);
        this.slider.nativeElement.addEventListener('mousemove', move);

        this.slider.nativeElement.addEventListener('mouseleave', end);
        document.addEventListener('mouseup', end);
        document.addEventListener('touchend', end);
        
      })();

      this.removeEvents = (() => {
        this.slider.nativeElement.removeEventListener('mousedown', start);
        this.slider.nativeElement.removeEventListener('touchstart', start);
      
        this.slider.nativeElement.removeEventListener('mousemove', move);
        this.slider.nativeElement.removeEventListener('touchmove', move);
      
        this.slider.nativeElement.removeEventListener('mouseleave', end);
        document.removeEventListener('mouseup', end);
        document.removeEventListener('touchend', end);
      });
    }
  }

  ngAfterContentInit(): void {
    
  }

  nextSlide(){
    
  }

  prevSlide(){
    
  }

  selectSlide(index:number){
    // this.slideArray[this.currentSlideIndex] = false;
    // this.slideArray[index] = true;
    // this.currentSlideIndex = index;
    // this.slideArray[index] = true;
    // this.updateSlider();
  }

  updateSlider(){
    this.translateValue = (this.currentSlideIndex + 1) * (-this.slideWidth) + this.slideOffsetX;
  }

  ngOnDestroy(): void {
    // if(isPlatformBrowser(this.platformId)){
      if(this.removeEvents){
        this.removeEvents();
      }
    // }
  }

  resizeSlider(){
    
  }
}
