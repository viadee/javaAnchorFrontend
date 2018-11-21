import { SafeNumberPipe } from './safe-number.pipe';
import {DecimalPipe} from '@angular/common';

describe('SafeNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeNumberPipe(new DecimalPipe('1'));
    expect(pipe).toBeTruthy();
  });
});
