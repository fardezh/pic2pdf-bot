import {
  InjectBot,
  Update,
  Start,
  Help,
  Command,
  On,
  Message,
  Ctx,
  Action,
} from 'nestjs-telegraf';
import { Bot } from 'src/app.constants';
import { PhotoPipe } from 'src/common/pipes/photo.pipe';
import { Telegraf } from 'telegraf';
import { CustomPhoto } from './types';
import { BotContext, SessionData } from 'src/interfaces';
import { Pic2pdfService } from './picpdf.service';

@Update()
export class Pic2pdfUpdate {
  constructor(
    @InjectBot(Bot)
    private readonly bot: Telegraf<BotContext>,
    private readonly pic2pdfService: Pic2pdfService,
  ) {}

  @On('photo')
  async onPhoto(
    @Ctx() ctx: BotContext,
    @Message('photo', new PhotoPipe()) photo: CustomPhoto,
  ) {
    ctx.session.photos.push(photo);
    const photoCount = ++ctx.session.photoCount;

    await ctx
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

  @Action('cancel')
  async cancel(@Ctx() ctx: BotContext) {
    const starterSessionData: SessionData = {
      photos: [],
      photoCount: 0,
      lastReplyId: 0,
    };

    ctx.session = starterSessionData;
    await ctx.editMessageText('حله، خواستی دوباره عکس بفرس برام.');
  }

  @Action('done')
  async done(@Ctx() ctx: BotContext) {
    await ctx.editMessageText('قبل اینکه فایلتو درست کنم، بگو اسمشو چی بذارم؟');

    this.bot.on('text', async (ctx) => {
      const fileName = await ctx.message.text
        .trim()
        .replace(/[\/|\\:*?"<>]/g, '');

      await ctx.reply('حله! دارم برات درستش میکنم...');

      const photos: CustomPhoto[] = ctx.session.photos;
      const filepath = await this.pic2pdfService.createPdf(photos);
      // await ctx.replyWithDocument({
      //   source: filepath,
      //   filename: `${fileName}.pdf`,
      // });

      ctx.session.lastReplyId = 0;
      ctx.session.photos = [];
      ctx.session.photoCount = 0;
    });
  }
}
