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
    ctx.session.photos.push(photo);
    const photoCount = ++ctx.session.photoCount;

    ctx
      .sendMessage(
        `عکست به فایل اضافه شد. بازم میتونی بفرستی.\nتعداد عکس‌ها: ${photoCount}`,
        {
          reply_to_message_id: ctx.message.message_id,
          reply_markup: {
            inline_keyboard: [
              [{ text: 'اوکیه! پی‌دی‌افش کن.', callback_data: 'done' }],
              [{ text: 'بیخیال نمیخوام.', callback_data: 'cancel' }],
            ],
          },
        },
      )
      .then((message) => {
        if (ctx.session.lastReplyId) {
          ctx.deleteMessage(ctx.session.lastReplyId);
        }
        ctx.session.lastReplyId = message.message_id;
      });
  }
}
