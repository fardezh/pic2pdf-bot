import { Module } from '@nestjs/common';
import { Pic2pdfService } from './picpdf.service';
import { Pic2pdfUpdate } from './pic2pdf.update';

@Module({
  providers: [Pic2pdfUpdate, Pic2pdfService],
})
export class Pic2pdfModule {}
