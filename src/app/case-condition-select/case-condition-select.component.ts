import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FeatureConditionResponse} from '../_models/FeatureConditionResponse';
import {FeatureConditionEnum} from '../_models/FeatureConditionEnum';
import {FeatureConditionMetric} from '../_models/FeatureConditionMetric';
import {FeatureConditionRequest} from '../_models/FeatureConditionRequest';

@Component({
  selector: 'app-case-condition-select',
  templateUrl: './case-condition-select.component.html',
  styleUrls: ['./case-condition-select.component.scss']
})
export class CaseConditionSelectComponent {

  private _columnsConditions: FeatureConditionResponse;
  enumColumns: string[] = [];
  metricColumns: string[] = [];

  selectForm = new FormGroup({});

  @Output() selectedConditions = new EventEmitter<FeatureConditionRequest>();

  constructor() {
  }

  onSubmit() {
    const conditions: FeatureConditionRequest = {
      enumConditions: new Map<string, FeatureConditionEnum>(),
      metricConditions: new Map<string, FeatureConditionMetric>()
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

  getEnumColumnsConditionsOf(column: string): Array<FeatureConditionEnum> {
    return this._columnsConditions.enumConditions[column];
  }

  getMetricColumnsConditionsOf(column: string): Array<FeatureConditionMetric> {
    return this._columnsConditions.metricConditions[column];
  }

  @Input()
  set columnsConditions(columnsConditions: FeatureConditionResponse) {
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
