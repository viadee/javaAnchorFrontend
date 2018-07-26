import {Component, Input, OnInit} from '@angular/core';
import {ColumnInfo} from '../_models/ColumnInfo';

interface DynamicObject {
  [key: string]: any;
}

class TableSettings implements DynamicObject {
  constructor(public columns: DynamicObject,
              public actions = {add: false, edit: false, delete: false},
              public attr = {class: 'table table-stripped table-hover'}) {
  }
}

class TableColumnSettings implements DynamicObject {
  constructor(public title: string) {
  }
}

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {

  constructor() {
  }

  private _columns: ColumnInfo[];

  data: DynamicObject[];

  settings: TableSettings;
  // settings = {
  //   columns: {
  //     label: {
  //       title: 'Label'
  //     },
  //     name: {
  //       title: 'Full Name'
  //     },
  //     username: {
  //       title: 'User Name'
  //     },
  //     email: {
  //       title: 'Email'
  //     }
  //   }
  // };

  ngOnInit() {
  }

  get columns(): ColumnInfo[] {
    return this._columns;
  }

  @Input()
  set columns(columns: ColumnInfo[]) {
    this._columns = columns;
    if (columns !== undefined && columns !== null && columns.length > 0
      && columns[0].data !== undefined && columns[0].data !== null && columns[0].data.length > 0) {

      const columnSettings: DynamicObject = {};
      columns.forEach((columnInfo: ColumnInfo) => {
        const label = columnInfo.label;
        columnSettings[label] = new TableColumnSettings(label);
      });

      this.settings = new TableSettings(columnSettings);

      const data = [];

      for (let i = 0; i < columns[0].data.length; i++) {
        const row: DynamicObject = {};
        for (const column of columns) {
          row[column.label] = column.data[i];
        }

        data.push(row);
      }

      this.data = data;
    }

  }

}
