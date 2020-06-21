import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  

  @Input() numberOfPages: number;
  @Output() pageNumber = new EventEmitter<number>();
  pageOptions: number[];

  currentPage = 1;
  

  constructor() { 
  }

  ngOnInit(): void { 
    this.showPaginator();
  }

  sendPageNumber(page: number) {
    this.pageNumber.emit(page);
    this.currentPage = page;
    this.showPaginator();
  }

  showPaginator(){
    this.pageOptions = [
      this.currentPage - 3,
      this.currentPage - 2,
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      this.currentPage + 2,
      this.currentPage + 3
    ].filter(pageNum => pageNum >= 1 && pageNum <= this.numberOfPages);
  }

  
  

}
