import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  list = [];
  column = [];
  list$ = new BehaviorSubject(this.list);

  constructor() {
    for (let i = 1; i < 15; i++) {
      this.column.push('Col' + i);
    }
    for (let i = 0; i < 1000; i++) {
      const item = {};
      for (let j = 0; j < this.column.length; j++) {
        item[this.column[j]] = this.makeid();
      }
      this.list.push(item);
    }
  }
  makeid() {
    const length = Math.floor(Math.random() * 50);
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  update(index, field, value) {
    this.list = this.list.map((e, i) => {
      if (index === i) {
        return {
          ...e,
          [field]: value
        };
      }
      return e;
    });
    this.list$.next(this.list);
  }

  getControl(index, fieldName) {
  }
}
