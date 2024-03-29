import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'singlelinearray'
})
export class SinglelinearrayPipe implements PipeTransform {

  transform(value: string[]): any  {
      return value.join(', ');
  }

}
