import { Component, Injector, OnInit } from '@angular/core';
import { User } from '../models/User';
import { AdminService } from '../services/admin.service';
import { PaginationService } from '../services/pagination.service';
import { createCustomElement } from '@angular/elements';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less'],
})
export class AdminComponent implements OnInit {
  originalUserData: User[];
  userData: User[];
  numberOfPages: number;
  currentPage: number;
  pageArray: number[] = [];
  allSelected = false;
  searchKeyword='';

  constructor(private adminService: AdminService, injector: Injector, public paginationService: PaginationService) {
    const paginationElement = createCustomElement(PaginationComponent, { injector });
    customElements.define('app-pagination', paginationElement);
  }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe((data: User[]) => {
      this.originalUserData = data;
      this.userData = this.originalUserData;
      this.initializingPagination();
      this.currentPage = 1;
    });
  }

  initializingPagination(): void {
    const returnedObj = this.paginationService.assigningPages(this.userData);
    this.userData = returnedObj.userData;
    this.pageArray = returnedObj.pageArray;
    this.numberOfPages = returnedObj.numberOfPages;
    this.changingCurrentPage(1);
  }

  changingCurrentPage(pageNbr: number): void {
    this.allSelected = false;
    this.currentPage = this.paginationService.changingCurrentPage(pageNbr);
    this.userData.forEach((user) => {
      if (this.currentPage === user.page) {
        this.selectUser(user);
      }
    });
  }
  searchSpecificKeyword(searchedData): void {
    const searchInput=this.searchKeyword;
    searchedData = searchedData.filter((user) => {
      return (
        user.name.toLowerCase().indexOf(searchInput) !== -1 ||
        user.email.toLowerCase().indexOf(searchInput) !== -1 ||
        user.role.toLowerCase().indexOf(searchInput) !== -1
      );
    });
    this.userData = searchedData;
  }

  searchUserData(event): void {
    const keycode = event.keyCode;
    if (keycode === 13) {
      const searchedData = this.originalUserData;
      this.searchSpecificKeyword(searchedData);
      this.initializingPagination();
    }
  }

  selectUser(user: User): void {
    user.selected = false;
    if (this.allSelected) {
      user.selected = this.allSelected;
    }
  }
  deleteRow(user: User): void {
    this.originalUserData = this.originalUserData.filter((userData) => {
      return user.id !== userData.id;
    });
  }
  deleteSingleRow(user: User): void {
    this.deleteRow(user);
    this.userData = this.originalUserData;
    if(this.searchKeyword.length){
      this.searchSpecificKeyword(this.userData);
    }
    this.initializingPagination();
    this.allSelected = false;
  }
  deleteMultipleRows(): void {
    const rowsToBeDeletedArray = this.userData.filter((user) => {
      return user.selected;
    });
    rowsToBeDeletedArray.forEach((user) => {
      this.deleteRow(user);
    });
    this.userData = this.originalUserData;
    if(this.searchKeyword.length){
      this.searchSpecificKeyword(this.userData);
    }
    this.initializingPagination();
    this.allSelected = false;
  }

  selectAllRows(): void {
    this.allSelected = !this.allSelected;
    this.userData.forEach((user) => {
      if (this.currentPage === user.page) {
        this.selectUser(user);
      }
    });
  }

  editUser(user: User): void {
    user.edit = !user.edit;
  }

  saveUser(user: User): void {
    user.edit = !user.edit;
    this.originalUserData = this.userData;
  }
}
