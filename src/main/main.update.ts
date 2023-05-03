import {
  InjectBot,
  Update,
  Start,
  Help,
  Command,
  On,
  Message,
} from 'nestjs-telegraf';
import { Bot } from 'src/app.constants';
import { Context, Telegraf } from 'telegraf';

@Update()
export class MainUpdate {
  constructor(
    @InjectBot(Bot)
    private readonly bot: Telegraf<Context>,
  ) {}

  @Start()
  async onStart(): Promise<string> {
    const me = await this.bot.telegram.getMe();
    return `Hey, I'm ${me.first_name}`;
  }

  @Help()
  async onHelp(): Promise<string> {
    return 'Send me any text';
  }

  @Command('admin')
  onAdminCommand(): string {
    return 'Welcome judge';
  }

  @On('text')
  onMessage(@Message('text') text: string): string {
    return text;
  }
}
