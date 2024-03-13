import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToasterModel } from '../../../core/domain/toaster.model';
import { ToasterService } from '../../../service/toaster.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [ToastComponent],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})

export class ToasterComponent implements OnInit , OnDestroy{
    toasts: ToasterModel[] = []
    toasterArraySubscription:Subscription | undefined;
  
    constructor(private tosterService:ToasterService){}
  
    ngOnInit(): void {
      this.toasterArraySubscription = this.tosterService.getToasts().subscribe(toasterArray => {
        this.toasts = toasterArray;
      });
    }
  
    ngOnDestroy(): void {
      if(this.toasterArraySubscription){
        this.toasterArraySubscription.unsubscribe();
      }
    }
  
    remove(toastId:string){
      this.tosterService.remove(toastId);
    }
}
