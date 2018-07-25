import {Component, Input, OnInit} from '@angular/core';
import {ColumnInfo} from '../_models/ColumnInfo';

@Component({
  selector: 'app-column-info',
  templateUrl: './column-info.component.html',
  styleUrls: ['./column-info.component.scss']
})
export class ColumnInfoComponent implements OnInit {

  constructor() {
  }

  private _columns: ColumnInfo[];

  get columns(): ColumnInfo[] {
    return this._columns;
  }

  @Input()
  set columns(columns: ColumnInfo[]) {
    this._columns = columns;
    if (columns !== null && columns.length > 0 && columns[0].data !== null && columns[0].data.length > 0) {

      const data = [];
      for (const i in columns[0].data) {
        const row = new Map<String, String>();
        for (const column of columns) {
          row.set(column.label, column.data[i]);
        }

        data.push(row);
      }
    }

    // const data_lengths = new Map();
    // for (const column of columns) {
    //   data_lengths.set(column.label, column.data.length);
    // }
    //
    // console.log(data_lengths);

    // for (const column of columns) {
    //   for (const i in column.data) {
    //     data[i][column.label] = column.data[i];
    //   }
    // }
  }

  settings = {
    columns: {
      label: {
        title: 'Label'
      },
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      }
    }
  };

  data = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    },

    // ... list of items

    {
      id: 11,
      name: 'Nicholas DuBuque',
      username: 'Nicholas.Stanton',
      email: 'Rey.Padberg@rosamond.biz'
    }
  ];

  ngOnInit() {
  }

}
