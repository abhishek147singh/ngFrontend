import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {
  @Input() noPages:number = 5;
  @Input() currentPage:number = 0;

  pages:number[] = [];

  @Output() onPageChange = new EventEmitter<number> ();

  ngOnInit(): void {
    this.genPages();
  }

  onNext(){
   if(this.currentPage !== this.noPages - 1){
    this.currentPage++;
    this.onPageChange.emit(this.currentPage);
    this.genPages();
   } 
  }

  onPrev(){
    if(this.currentPage !== 0){
      this.currentPage--;
      this.onPageChange.emit(this.currentPage);
      this.genPages();
    }
  }

  onUpdatePage(page:number){
    this.currentPage = page;
    this.onPageChange.emit(this.currentPage);
    this.genPages();
  }

  genPages(){
    let pages:number[] = [];
    let noOfPageNavButton:number = 4;
    
    if(noOfPageNavButton > this.noPages){
      noOfPageNavButton = this.noPages;
    }
    if(this.currentPage === 0){
      for(let i = 0; i < noOfPageNavButton; i++){
        pages.push(i);
      }
    }else if(this.currentPage === this.noPages - 1){
      for(let i = 0; i < noOfPageNavButton; i++){
        pages.push(this.noPages - i - 1);
      }
      pages.reverse()
    }else{
      const midValue = Math.floor(noOfPageNavButton/2);
      let start = this.currentPage - midValue;
      let end = start + noOfPageNavButton;
      if(start < 0){
        start = 0;
        end = noOfPageNavButton;
      }else if(end > this.noPages){
        end = this.noPages;
        if(end - noOfPageNavButton > 0){
          start = end - noOfPageNavButton;
        }
      } 
      
      for(let i = start; i < end; i++){
        pages.push(i);
      }
    }

    this.pages = pages;
  }
}
