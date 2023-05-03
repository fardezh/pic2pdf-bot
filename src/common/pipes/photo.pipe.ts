import { Injectable, PipeTransform } from '@nestjs/common';
import { CustomPhoto } from 'src/pic2pdf/types';
import { TelegramPhoto } from '../types';

@Injectable()
export class PhotoPipe implements PipeTransform {
  transform(value: TelegramPhoto): CustomPhoto {
    const photo = value[value.length - 1];

    return (({ file_id, width, height }) => ({
      file_id,
      width,
      height,
    }))(photo);
  }
}
