import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/store.state';
import { getTotalNoProducts } from '../../../store/cart/cart.selector';
import { Observable, Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { categoryNameListItemModel } from '../../../core/domain/product/category-name-list.model';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AsyncPipe, FormsModule],
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

export class HeaderComponent implements OnInit, OnDestroy{
  isCategoryDropDownActive:boolean = false;
  isHeader2Opened:boolean = false;

  totalCartProducts:number = 0;
  cartProductSubscription:Subscription|undefined;

  categoryList:Observable<categoryNameListItemModel[]>|undefined;

  constructor(private store:Store<AppState>, private productService:ProductService, private router:Router){}

  ngOnInit(): void {
    this.cartProductSubscription = this.store.select(getTotalNoProducts).subscribe(total => {
      this.totalCartProducts = total;
    })

    this.categoryList = this.productService.getCategoryNameList();
  }

  ngOnDestroy(): void {
    this.cartProductSubscription?.unsubscribe();
  }

  onSearch(searchValue:string){
    this.router.navigate(['/', 'shop'], {
      queryParams:{ query: searchValue, page:1}
    });
  }
}
