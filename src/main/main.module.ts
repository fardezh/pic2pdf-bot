import { Module } from '@nestjs/common';
import { MainUpdate } from './main.update';

@Module({
  providers: [MainUpdate],
})
export class MainModule {}
