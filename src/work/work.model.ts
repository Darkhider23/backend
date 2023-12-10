// work.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Work extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop([String])
  images?: string[];

  @Prop()
  customerLink?: string;

  @Prop()
  hidden: boolean;
}

export const WorkSchema = SchemaFactory.createForClass(Work);
