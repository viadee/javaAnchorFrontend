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

  @Input() value: string | number;
  @Input() rowData: any;

}
