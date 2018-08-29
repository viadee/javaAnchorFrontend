import {Component, Input, OnInit} from '@angular/core';
import {ColumnSummary} from '../_models/ColumnSummary';


@Component({
  selector: 'app-column-info',
  templateUrl: './column-info.component.html',
  styleUrls: ['./column-info.component.scss']
})
export class ColumnInfoComponent implements OnInit {

  @Input() columns: ColumnSummary[];

  constructor() {
  }

  ngOnInit() {
  }

}
