﻿import { first } from 'rxjs/operators';

import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {CoreService} from '@app/core.service';
import { UserService } from '@app/user.service';
import { ResizeEvent} from 'angular-resizable-element';
import { SpinnerVisibilityService } from 'ng-http-loader';
import {LazyLoadEvent} from 'primeng/api';



export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  authdata?: string;
}

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    loading = false;
    users: User[];
    dataSource = [];
    clonedataSource = [];
    controls: FormArray;
    displayedColumns = [];
    constructor(private userService: UserService, private core: CoreService, private spinner: SpinnerVisibilityService) { 
      this.loading = true;
      this.spinner.show();
      this.userService.getAll().pipe(first()).subscribe(users => {
        this.loading = false;
        this.users = users;
        this.displayedColumns =  this.core.column;
        this.dataSource = this.core.list;
        this.spinner.hide();
      });
    }
    
    ngOnInit() {
      
    }
    
}

