import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  list = [];
  column = [{field: 'id', header: 'id', width: '100px'}];

  constructor() {
    for (let i = 1; i < 100; i++) {
      this.column.push({field: 'col' + i, header: 'col' + i, width: '150px'});
    }
    for (let i = 0; i < 6001; i++) {
      let item = {id: this.list.length};
      for (let j = 0; j < this.column.length; j++) {
        if(j !== 0) {
          item[this.column[j].field] = this.makeid();
        }
      }
      this.list.push(item);
    }
  }
  setRow(count) {
   
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
  setData(count, rowCount) {
    this.list = [];
    this.column = [{field: 'id', header: 'id', width: '100px'}];
    for (let i = 1; i < count; i++) {
      this.column.push({field: 'col' + i, header: 'col' + i, width: '100px'});
    }
    for (let i = 0; i < rowCount; i++) {
      let item = {id: this.list.length};
      for (let j = 0; j < this.column.length; j++) {
        if(j !== 0) {
          item[this.column[j].field] = this.makeid();
        }
      }
      this.list.push(item);
    }
    return this.list;
  }
}
