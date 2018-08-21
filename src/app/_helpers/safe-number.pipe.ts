import { Pipe, PipeTransform } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import * as _ from 'lodash';

@Pipe({
  name: 'safeNumber'
})
export class SafeNumberPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {
  }

  transform(value: any, args?: any): any {
    return _.isNumber(value) ? this.decimalPipe.transform(value, args) : value;
  }
}
