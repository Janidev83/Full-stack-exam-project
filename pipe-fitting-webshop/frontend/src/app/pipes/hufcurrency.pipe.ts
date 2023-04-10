import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'hufCurrency'
})
export class HufCurrencyPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}

  transform(value: number): string | null {
    return this.currencyPipe.transform(value, 'HUF', 'symbol', '1.0-0', 'hu-HU');
  }
}
