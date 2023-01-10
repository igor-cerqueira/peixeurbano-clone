import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shared'
})
export class SharedPipe implements PipeTransform {

  transform(texto: string): string {
    if (texto.length > 15) {
      return texto.substr(0, 15) + '...'
    }
    return texto
  }

}
