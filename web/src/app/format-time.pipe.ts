import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number): string {

    var h = Math.floor(value / 3600);
    var m = Math.floor(value % 3600 / 60);
    var s = Math.floor(value % 3600 % 60);

    return (
      (h) +
      ":" +
      ("00" + m).slice(2) +
      ":" +
      ("00" + s).slice(2)
    );

  }

}
