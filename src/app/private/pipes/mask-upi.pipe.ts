import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskUpi'
})
export class MaskUpiPipe implements PipeTransform {

  transform(upi: string): string {
    if (!upi) return '';
    const [name, domain] = upi.split('@');
    return name.length > 2
      ? `${name.slice(0, 2)}***@${domain}`
      : `***@${domain}`;
  }

}
