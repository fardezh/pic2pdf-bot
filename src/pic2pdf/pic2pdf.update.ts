import {
  InjectBot,
  Update,
  Start,
  Help,
  Command,
  On,
  Message,
  Ctx,
} from 'nestjs-telegraf';
import { Bot } from 'src/app.constants';
import { PhotoPipe } from 'src/common/pipes/photo.pipe';
import { Telegraf } from 'telegraf';
import { CustomPhoto } from './types';
import { BotContext, SessionData } from 'src/interfaces';

@Update()
export class Pic2pdfUpdate {
  constructor(
    @InjectBot(Bot)
    private readonly bot: Telegraf<BotContext>,
  ) {}

  @On('photo')
  async onPhoto(
    @Ctx() ctx: BotContext,
    @Message('photo', new PhotoPipe()) photo: CustomPhoto,
  ) {
    console.log(photo);
    ctx.session.photos.push(photo);
    // ctx.session.photoCount++;

    console.log(ctx.session);
  }
}
