import { SafeNumberPipe } from './safe-number.pipe';

describe('SafeNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
