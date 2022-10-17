import { Pipe, PipeTransform } from '@angular/core';
import * as dot from 'dot-object';
@Pipe({
  name: 'targetEntityToName'
})
export class TargetEntityToNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const name = dot.pick(args.targetEntity, value);
    return name;
  }

}
