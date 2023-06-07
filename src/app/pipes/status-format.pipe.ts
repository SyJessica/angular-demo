import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusFormat'
})
export class StatusFormatPipe implements PipeTransform {

  transform(value?: string, ...args: unknown[]): string {
    if(value === 'beforePublish') {
      return '未发布'
    }
    if(value === 'published') {
      return '发布中'
    }
    if(value === 'end') {
      return '已截止'
    }
    return ''
  }

}
