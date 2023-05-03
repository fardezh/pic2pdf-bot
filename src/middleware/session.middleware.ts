import { SessionData } from 'src/interfaces';
import { session } from 'telegraf';

export const sessionMiddleware = session({
  defaultSession: () =>
    ({
      photos: [],
      photoCount: 0,
      lastReplyId: 0,
    } as SessionData),
});
