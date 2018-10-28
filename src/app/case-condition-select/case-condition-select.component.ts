import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CaseSelectConditionResponse} from '../_models/CaseSelectConditionResponse';
import {CaseSelectConditionEnum} from '../_models/CaseSelectConditionEnum';
import {CaseSelectConditionMetric} from '../_models/CaseSelectConditionMetric';
import {CaseSelectCondition} from '../_models/CaseSelectCondition';

@Component({
  selector: 'app-case-condition-select',
  templateUrl: './case-condition-select.component.html',
  styleUrls: ['./case-condition-select.component.scss']
})
export class CaseConditionSelectComponent {

  private _columnsConditions: CaseSelectConditionResponse;
  enumColumns: string[] = [];
  metricColumns: string[] = [];

  selectForm = new FormGroup({});

  @Output() selectedConditions = new EventEmitter<CaseSelectConditionResponse>();

  constructor() {
  }

  onSubmit() {
    const conditions: CaseSelectConditionResponse = {
      enumConditions: new Map<string, Array<CaseSelectConditionEnum>>(),
      metricConditions: new Map<string, Array<CaseSelectConditionMetric>>()
    };
    for (const [key, control] of Object.entries(this.selectForm.controls)) {
      if (!control.touched || control.value.length <= 0) {
        continue;
      }
      if (control.value.columnType === 'string') {
        conditions.enumConditions[control.value.featureName] = control.value;
      }
      if (control.value.columnType === 'metric') {
        conditions.metricConditions[control.value.featureName] = control.value;
      }
    }

    this.selectedConditions.emit(conditions);
  }

  getEnumColumnsConditionsOf(column: string): Array<CaseSelectConditionEnum> {
    return this._columnsConditions.enumConditions[column];
  }

  getMetricColumnsConditionsOf(column: string): Array<CaseSelectConditionMetric> {
    return this._columnsConditions.metricConditions[column];
  }

  @Input()
  set columnsConditions(columnsConditions: CaseSelectConditionResponse) {
    this._columnsConditions = columnsConditions;

    if (this._columnsConditions !== undefined && this._columnsConditions !== null) {
      this.enumColumns = [];
      this.metricColumns = [];
      for (const [key, val] of Object.entries(columnsConditions.enumConditions)) {
        this.enumColumns.push(key);
        this.selectForm.addControl(this.getIdForColumn(key), new FormControl(''));
      }
      for (const [key, val] of Object.entries(columnsConditions.metricConditions)) {
        this.metricColumns.push(key);
        this.selectForm.addControl(this.getIdForColumn(key), new FormControl(''));
      }
    }
  }

  public getIdForColumn(column: string): string {
    return column;
  }

}
