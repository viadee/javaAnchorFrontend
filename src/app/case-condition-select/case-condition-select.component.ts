import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-case-condition-select',
  templateUrl: './case-condition-select.component.html',
  styleUrls: ['./case-condition-select.component.scss']
})
export class CaseConditionSelectComponent {

  private _columnsConditions: Map<string, Map<number, string>>;
  columns: string[] = [];
  selectForm = new FormGroup({});

  @Output() selectedConditions = new EventEmitter<Map<string, string>>();

  constructor() {
  }

  onSubmit() {
    const conditions = new Map<string, string>();
    for (const [key, control] of Object.entries(this.selectForm.controls)) {
      if (!control.touched || control.value.length <= 0) {
        continue;
      }
      conditions.set(key, control.value);
    }

    this.selectedConditions.emit(conditions);
  }

  getColumnsConditionsOf(column: string) {
    const values = [];

    for (const [key, val] of Object.entries(this._columnsConditions[column])) {
      values.push({key: key, value: val});
    }
    return values;
}

  @Input()
  set columnsConditions(columnsConditions: Map<string, Map<number, string>>) {
    this._columnsConditions = columnsConditions;

    if (this._columnsConditions !== undefined && this._columnsConditions !== null) {
      this.columns = [];
      for (const [key, val] of Object.entries(columnsConditions)) {
        this.columns.push(key);
      }

      for (const column of this.columns) {
        this.selectForm.addControl(this.getIdForColumn(column), new FormControl(''));
      }
    }
  }

  private hashCode(column: string) {
    let hash = 0, i, chr, len;
    if (column.length === 0) {
      return hash;
    }
    for (i = 0, len = column.length; i < len; i++) {
      chr = column.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  public getIdForColumn(column: string) {
    return column;
  }

}
