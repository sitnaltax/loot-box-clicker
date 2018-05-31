import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberToScientificNotation'
})
export class NumberToScientificNotationPipe implements PipeTransform {
    transform(input: number): string {
        if (input < 100000) {
            return "" + input;
        }
        let power = Math.round(Math.log10(input));
        let mantissa = (input / (Math.pow(10, power))).toFixed(3);
        return mantissa.toString() + ' × 10<sup>' + power.toString() + '</sup>';
    }
}