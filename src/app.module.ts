import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule } from '@nestjs/config';
import { MainModule } from './main/main.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      botName: 'bot',
      token: process.env.BOT_TOKEN,
      include: [MainModule],
    }),
    MainModule,
  ],
})
export class AppModule {}
