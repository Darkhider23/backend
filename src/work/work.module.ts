// work.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Work, WorkSchema } from './work.model';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Work.name, schema: WorkSchema }])],
  providers: [WorkService],
  controllers: [WorkController],
})
export class WorkModule {}
