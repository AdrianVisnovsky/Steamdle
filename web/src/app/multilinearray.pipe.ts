import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'multilnearray',
    pure: true
})
export class MultilineArrayPipe implements PipeTransform {

    transform(value: string[]): any {
        return value.join(', <br>');
    }

}
