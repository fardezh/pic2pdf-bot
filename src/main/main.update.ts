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
import { BotContext, SessionData } from 'src/interfaces';
import { Telegraf } from 'telegraf';

@Update()
export class MainUpdate {
  constructor(
    @InjectBot(Bot)
    private readonly bot: Telegraf<BotContext>,
  ) {}

  @Start()
  async onStart(@Ctx() ctx: BotContext): Promise<void> {
    this.emptySession(ctx);

    ctx.sendMessage('برام عکس(ها)ت رو بفرس.', {
      reply_to_message_id: ctx.message.message_id,
    });
  }

  @Help()
  async onHelp(): Promise<string> {
    return 'عکسایی که میخوای پی‌دی‌اف کنی رو بفرس.\nبقیه‌ش با من😉';
  }

  @Command('about')
  async about(@Ctx() ctx: BotContext) {
    ctx.sendMessage(
      'Made with ❤️ by @Farddezh\nPlease consider giving this project a ⭐ on GitHub to show your support. Thank you!',
      {
        reply_to_message_id: ctx.message.message_id,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Github',
                url: 'https://github.com/fardezh/pic2pdf-telegraf-bot',
              },
            ],
          ],
        },
      },
    );
  }

  private emptySession(ctx: BotContext) {
    const starterSessionData: SessionData = {
      photos: [],
      photoCount: 0,
      lastReplyId: 0,
    };

    ctx.session = starterSessionData;
  }
}
