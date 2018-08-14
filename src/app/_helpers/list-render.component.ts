import {Component, Input} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

/**
 * This component renders a checkbox in a table cell.
 *
 * @Author ak902764
 */
@Component({
  template: `
    <div>
      <ul style="list-style-type: None">
        <li *ngFor="let item of value">{{ item }}</li>
      </ul>
    </div>
  `,
})
export class ListRenderComponent implements ViewCell {

  private _value: any;
  @Input() rowData: any;

  get value(): any {
    return this._value;
  }

  @Input()
  set value(value: any) {
    const val = [];
    if (Array.isArray(value)) {
      this._value = value;
    } else {
      for (const entry of Object.entries(value)) {
        val.push(entry[0] + ' = ' + entry[1]);
      }
      this._value = val;
    }

  }
}
