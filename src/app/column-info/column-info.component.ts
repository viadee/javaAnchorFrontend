import {Component, Input, OnInit} from '@angular/core';
import {ColumnInfo} from '../_models/ColumnInfo';


@Component({
  selector: 'app-column-info',
  templateUrl: './column-info.component.html',
  styleUrls: ['./column-info.component.scss']
})
export class ColumnInfoComponent implements OnInit {

  @Input() columns: ColumnInfo[];

  constructor() {
  }

  ngOnInit() {
  }

}
