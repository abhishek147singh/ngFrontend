import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { Subscription, interval } from 'rxjs';
import { ToasterModel } from '../../../core/domain/toaster.model';
import { ToasterType } from '../../../core/enums/Toaster.enum';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  animations:[
    trigger('toaster',[
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate(150, style({ transform: 'translateX(0)' }))
      ]),
      transition('* => void', [
        animate(150, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})

export class ToastComponent implements OnInit, OnDestroy {

  private lifeSpan:number = 300;
  
  private totalLifeSpan:number = 300;

  toasterTypes = ToasterType;

  isHover:boolean = false;

  progress:number = 100;

  intervalSubscription:Subscription | undefined;


  @Input() toast:ToasterModel|undefined;

  @Output() removeToasterEmt = new EventEmitter<string> ();

  ngOnInit(): void {
    this.intervalSubscription = interval(10).subscribe(time => {
      this.onEachTimerStep();
    });
  }

  ngOnDestroy(): void {
    if(this.intervalSubscription){
      this.intervalSubscription.unsubscribe();
    }
  }

  onEachTimerStep(){
    if(!this.isHover){

      this.lifeSpan--;
      this.progress = this.getPercentage(this.totalLifeSpan, this.lifeSpan);
      
      if(this.lifeSpan <= 0 && this.toast){
        this.remove(this.toast.id);
      }
    }
  }

  remove(toastId:string){
    this.removeToasterEmt.emit(toastId);
  }

  getPercentage(total:number, current:number){
    return Math.floor((current / total) * 100);
  }
}