import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  assigningPages(userData: Array<User>): any {
    const dataLength = userData.length;
    const flooredVal = Math.floor(dataLength / 10);
    const remainderItems = dataLength % 10;
    const numberOfPages = remainderItems > 0 ? flooredVal + 1 : flooredVal;
    userData.forEach((user: User, index) => {
      for (let i = 1; i < numberOfPages + 1; i++) {
        if (index < i * 10) {
          user.page = i;
          break;
        }
      }
    });
    const pageArray = [];
    for (let j = 1; j < numberOfPages + 1; j++) {
      pageArray.push(j);
    }
    return { numberOfPages, pageArray, userData };
  }

  changingCurrentPage(pageNbr: number): number {
    return pageNbr;
  }
}
