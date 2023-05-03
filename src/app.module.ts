import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule } from '@nestjs/config';
import { MainModule } from './main/main.module';
import { sessionMiddleware } from './middleware/session.middleware';
import { Pic2pdfModule } from './pic2pdf/pic2pdf.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      botName: 'bot',
      token: process.env.BOT_TOKEN,
      middlewares: [sessionMiddleware],
      include: [MainModule, Pic2pdfModule],
    }),
    MainModule,
    Pic2pdfModule,
  ],
})
export class AppModule {}
