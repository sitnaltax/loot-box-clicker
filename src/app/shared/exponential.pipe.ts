import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'exponential'
})
export class ExponentialPipe implements PipeTransform {
    transform(value: number, length: number): string | number {
        const tooBig = Math.pow(10, length);
        if (value < tooBig) {
          console.log('small enough', value);
          return value;
        } else {
          console.log('too big', value);
          return value.toExponential(length - 4);
        }
    }
}
