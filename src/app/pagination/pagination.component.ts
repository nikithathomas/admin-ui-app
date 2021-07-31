import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/User';
import { PaginationService } from '../services/pagination.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less']
})
export class PaginationComponent implements OnInit {
  @Input() pageArray: Array<number>;
  @Input() numberOfPages: number;
  @Input() currentPage: number;

  @Output() changePage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }
  switchPages(pageNbr: number): void {
    this.changePage.emit(pageNbr);
  }
}
