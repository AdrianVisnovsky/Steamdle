import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'multilnearray',
    pure: true,
    standalone: false
})
export class MultilineArrayPipe implements PipeTransform {

    transform(value: string[]): any {
        return value.join(', <br>');
    }

}
