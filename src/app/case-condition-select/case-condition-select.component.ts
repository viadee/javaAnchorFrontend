import {Component, Input, OnInit} from '@angular/core';
import {FrameSummary} from '../_models/FrameSummary';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-case-condition-select',
  templateUrl: './case-condition-select.component.html',
  styleUrls: ['./case-condition-select.component.scss']
})
export class CaseConditionSelectComponent implements OnInit {

  private _frameSummary: FrameSummary;
  columnsConditions = new Map<string, [string]>();

  selectForm: FormGroup = new FormGroup({});

  constructor() {
  }

  ngOnInit(): void {

  }

  get frameSummary() {
    return this._frameSummary;
  }

  @Input()
  set frameSummary(frameSummary: FrameSummary) {
    this._frameSummary = frameSummary;
    if (this._frameSummary !== undefined && this._frameSummary !== null) {

      const columnFormGroup: {
        [key: string]: AbstractControl
      } = {};
      for (const column of this._frameSummary.column_summary_list) {
        columnFormGroup[column.label] = new FormControl('');
      }

      this.selectForm = new FormGroup(columnFormGroup);
      //   server: new FormControl(this.paramServer),
      //   model: new FormControl({value: '', disabled: true}),
      //   frame: new FormControl({value: '', disabled: true})
      // });

      this.computeSearchConditions();
    }
  }

  getColumns() {
    // const columns = new Array();
    // this.columnsConditions.forEach(((value, key) => {
    //   columns.push(key)
    // }))
    // for (const column of this.columnsConditions.keys()) {
    //   columns.push(column.label);
    // }
    return Array.from(this.columnsConditions.keys());
  }

  private computeSearchConditions() {
    const conditions = new Map<string, [string]>();
    const columns = this._frameSummary.column_summary_list;
    for (const column of columns) {
      const columnConditions: string[] = [];
      if (['enum', 'string'].includes(column.column_type)) {
        for (const cat of column.categories) {
          columnConditions.push(`${column.label} = ${cat.name}`);
        }
      } else {
        const buckets = 4;
        const min = column.column_min;
        const max = column.column_max;
        const step = (max - min) / buckets;

        for (let i = 0; i < buckets; i++) {
          if (i === 0) {
            columnConditions.push(`${column.label} < ${min + step}`);
          } else if (i === buckets - 1) {
            columnConditions.push(`${min + i * step} < ${column.label}`);
          } else {
            columnConditions.push(`${min + i * step} <= ${column.label} <= ${min + (i + 1) * step}`);
          }
        }
      }
      conditions[column.label] = columnConditions;
    }

    this.columnsConditions = conditions;
  }

}
