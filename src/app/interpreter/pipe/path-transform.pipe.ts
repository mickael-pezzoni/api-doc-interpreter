import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pathTransform'
})
export class PathTransformPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let countOfArg = 0;
    return value.split('/').map((arg) => {
      if (!isNaN(parseInt(arg, 10))) {
        countOfArg++;
        return `{arg${countOfArg}}`
      }
      return arg;
    }).join('/');
  }

}
