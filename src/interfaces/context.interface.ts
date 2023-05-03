import { Context } from 'telegraf';
import { SessionData } from './sessionData.interface';

export interface BotContext extends Context {
  session: SessionData;
}
