import { first } from 'rxjs/operators';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {CoreService} from '@app/core.service';
import { UserService } from '@app/user.service';
import { ResizeEvent} from 'angular-resizable-element';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

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
    dataSource = new MatTableDataSource([]);
    controls: FormArray;
    displayedColumns: string[] = [];
    constructor(private userService: UserService, private core: CoreService) { }
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


    ngOnInit() {
      this.loading = true;
      this.userService.getAll().pipe(first()).subscribe(users => {
        this.loading = false;
        this.users = users;
        this.displayedColumns =  this.core.column;
        const toGroups = this.core.list$.value.map(entity => {
          const formGroup = new FormGroup({}, {updateOn: 'blur'});
          for (const item of this.displayedColumns) {
            formGroup.addControl(item, new FormControl('', Validators.required));
          }
          return formGroup;
        });
        this.controls = new FormArray(toGroups);
        this.dataSource = new MatTableDataSource( this.core.list$.value );
        this.dataSource.paginator = this.paginator;

      });
    }
   drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
    onResizeEnd(event: ResizeEvent, columnName): void {
      if (event.edges.right) {
        const cssValue = event.rectangle.width + 'px';
        console.log(cssValue, event.rectangle );
        const columnElts = document.getElementsByClassName('mat-column-' + columnName);

        for (let i = 0; i < columnElts.length; i++) {
          const currentEl = columnElts[i] as HTMLDivElement;
          currentEl.style.width = cssValue;
        }
      }
    }

    updateField(index, field) {
      const control = this.getControl(index, field);
      if (control.valid) {
        this.core.update(index, field, control.value);
        this.dataSource = new MatTableDataSource( this.core.list$.value );
        this.dataSource.paginator = this.paginator;
      }
    }
    getControl(index, fieldName) {
      const a  = this.controls.at(index).get(fieldName) as FormControl;
      return this.controls.at(index).get(fieldName) as FormControl;
    }
}

