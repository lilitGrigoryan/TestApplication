import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  list = [];
  column = [{field: 'id', header: 'id', width: '100px'}];

  constructor() {
    for (let i = 1; i < 101; i++) {
      this.column.push({field: 'col' + i, header: 'col' + i, width: '100px'});
    }
    for (let i = 0; i < 16000; i++) {
      let item = {id: this.list.length};
      for (let j = 0; j < this.column.length; j++) {
        if(j !== 0) {
          item[this.column[j].field] = this.makeid();
        }
      }
      this.list.push(item);
    }
  }

  makeid() {
    const length = Math.floor(Math.random() * 10);
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  setData() {
    for (let i = 0; i < 1000; i++) {
      const item = {};
      for (let j = 0; j < this.column.length; j++) {
        if(j == 0) {
          item['id'] = this.list.length; 
        } else {
          item[this.column[j].field] = this.makeid();
        }      }
      this.list.push(item);
    }
    return this.list;
  }
}
