import { JsonprettyPipe } from './jsonpretty.pipe';

describe('JsonprettyPipe', () => {
  it('create an instance', () => {
    const pipe = new JsonprettyPipe();
    expect(pipe).toBeTruthy();
  });
});
