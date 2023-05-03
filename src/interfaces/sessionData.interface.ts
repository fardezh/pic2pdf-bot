import { CustomPhoto } from 'src/pic2pdf/types';

export type SessionData = {
  photos: CustomPhoto[];
  photoCount: number;
  lastReplyId?: number;
};
