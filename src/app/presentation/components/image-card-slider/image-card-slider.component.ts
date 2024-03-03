import { NgClass, NgStyle } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-card-slider',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './image-card-slider.component.html',
  styleUrl: './image-card-slider.component.scss'
})
export class ImageCardSliderComponent implements OnInit, AfterViewInit,OnDestroy {
  translateValue:number = 0;

  isDown = false;
  startX = 0;
  scrollLeft = 0;
  prevTranslateValue = 0;

  slideWidth:number = 220;

  sliderWidth:number = 0;
  sliderContainerWidth:number = 0;

  currentIndex:number = 0;
  intervalId:any;
  isMoveHover:boolean = false;
  isTransitionRemoved:boolean = false;

  removeEvents: (() => void) | undefined;

  @Input() ImageList:string[] = [
    './../../../../assets/img/vendor-1.jpg',
    './../../../../assets/img/vendor-2.jpg',
    './../../../../assets/img/vendor-3.jpg',
    './../../../../assets/img/vendor-4.jpg',
    './../../../../assets/img/vendor-5.jpg',
    './../../../../assets/img/vendor-6.jpg',
    './../../../../assets/img/vendor-1.jpg',
    './../../../../assets/img/vendor-2.jpg',
    './../../../../assets/img/vendor-3.jpg',
    './../../../../assets/img/vendor-4.jpg',
    './../../../../assets/img/vendor-5.jpg',
    './../../../../assets/img/vendor-6.jpg',
  ];

  //sliderContainer
  @ViewChild('slider') slider!:ElementRef;
  @ViewChild('sliderContainer') sliderContainer!:ElementRef;

  constructor(){}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if(this.slider && this.sliderContainer){
      this.sliderContainerWidth = this.sliderContainer.nativeElement.offsetWidth;
      this.sliderWidth = this.slider.nativeElement.offsetWidth;

      const noOfVisibleCards = Math.round(this.sliderContainerWidth / this.slideWidth);
      const cards = [...this.slider.nativeElement.children];

      cards.slice(-noOfVisibleCards).reverse().forEach(card => {
        this.slider.nativeElement.insertAdjacentHTML("afterbegin", card.outerHTML);
      });

      cards.slice(0, noOfVisibleCards).reverse().forEach(card => {
        this.slider.nativeElement.insertAdjacentHTML("beforeend", card.outerHTML);
      });

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

        const noCardHasPass = Math.abs(Math.floor(dist/this.slideWidth));

        if(this.translateValue > 0){
          this.translateValue = - this.sliderWidth;
          return;
        }else if(this.translateValue + this.sliderWidth - this.sliderContainerWidth < 0){
          this.translateValue = 0;
        }

        if(delta > thresold){
          this.nextSlide(noCardHasPass);
        }else if(delta < -thresold){
          this.prevSlide(noCardHasPass);
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


      this.intervalId = setInterval(() => {
        if(!this.isMoveHover){
          this.nextSlide(1)
        }
      }, 1000);
    }
  }

  nextSlide(no:number){
    const nextSlideIndex = (this.currentIndex + no) % this.ImageList.length;
    this.translateValue = - (this.slideWidth * (nextSlideIndex));
    this.currentIndex = this.currentIndex + no;
  }

  prevSlide(no:number){
    console.log({no});
    this.translateValue = - (this.slideWidth * ((this.currentIndex - no) % this.ImageList.length));
    this.currentIndex = this.currentIndex - no;
  }

  ngOnDestroy(): void {
      if(this.removeEvents){
        this.removeEvents();
      }
      
      if(this.intervalId){
        clearInterval(this.intervalId);
      }
  }
}
