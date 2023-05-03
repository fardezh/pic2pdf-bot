import { Injectable } from '@nestjs/common';
import { PDFDocument } from 'pdfkit';
import { CustomPhoto } from './types';

@Injectable()
export class Pic2pdfService {
  async createPdf(photos: CustomPhoto[]) {
//     const buffers = [];
//     const doc = new PDFDocument({ autoFirstPage: false });
//     doc.on('data', buffers.push.bind(buffers));

//     let photo: CustomPhoto;
//     for (photo of photos) {
//       const response = await axios({
//         url: fileLink,
//         responseType: 'arraybuffer',
//       });
//       doc.addPage({ size: [photo.width, photo.height] });
//       doc.image(response.data, 0, 0);
//     }
//     doc.end();
//     const pdfData = Buffer.concat(buffers);
//     return pdfData;
//   }
}
