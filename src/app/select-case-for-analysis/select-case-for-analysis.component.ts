import {Component, Input, OnInit} from '@angular/core';
import {ColumnSummary} from '../_models/ColumnSummary';

@Component({
  selector: 'app-select-case-for-analysis',
  templateUrl: './select-case-for-analysis.component.html',
  styleUrls: ['./select-case-for-analysis.component.scss']
})
export class SelectCaseForAnalysisComponent implements OnInit {

  @Input() columns: ColumnSummary[];

  constructor() {
  }

  ngOnInit() {
  }

}
