import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { CustomPhoto } from './types';
import axios from 'axios';
import { InjectBot } from 'nestjs-telegraf';
import { Bot } from 'src/app.constants';
import { Telegraf } from 'telegraf';
import { BotContext } from 'src/interfaces';

@Injectable()
export class Pic2pdfService {
  constructor(@InjectBot(Bot) private readonly bot: Telegraf<BotContext>) {}

  async createPdf(photos: CustomPhoto[]): Promise<Buffer> {
    const buffers = [];
    const doc = new PDFDocument({ autoFirstPage: false });
    doc.on('data', buffers.push.bind(buffers));
    let photo: CustomPhoto;
    for (photo of photos) {
      const fileLink = (await this.bot.telegram.getFileLink(photo.file_id))
        .href;
      const response = await axios({
        url: fileLink,
        responseType: 'arraybuffer',
      });
      doc.addPage({ size: [photo.width, photo.height] });
      doc.image(response.data, 0, 0);
    }
    doc.end();
    const pdfData = Buffer.concat(buffers);
    return pdfData;
  }
}
