import {Component, Input, OnInit} from '@angular/core';
import {ColumnSummary} from '../_models/ColumnSummary';
import {LocalDataSource} from 'ng2-smart-table';

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
    this.source = new LocalDataSource();
  }

  private _columns: ColumnSummary[];

  public source: LocalDataSource;

  settings: TableSettings;
  // settings = {
  //   columns: {
  //     label: {
  //       title: 'Label'
  //     },
  //     name: {
  //       title: 'Full Name'
  //     }
  //   }
  // };

  ngOnInit() {
  }

  get columns(): ColumnSummary[] {
    return this._columns;
  }

  @Input()
  set columns(columns: ColumnSummary[]) {
    this._columns = columns;
    if (columns !== undefined && columns !== null && columns.length > 0
      && columns[0].data !== undefined && columns[0].data !== null && columns[0].data.length > 0) {

      const columnSettings: DynamicObject = {};

      columns.forEach((columnInfo: ColumnSummary) => {
        const label = columnInfo.label;
        columnSettings[label] = new TableColumnSettings(label);
      });

      this.settings = new TableSettings(columnSettings);

      const data = [];

      for (let i = 0; i < columns[0].data.length; i++) {
        const row: DynamicObject = {};

        columns.forEach((column: ColumnSummary) => {
          row[column.label] = column.data[i];
        });

        data.push(row);
      }

      this.source.load(data);
    }

  }

}
