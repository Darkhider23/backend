// database.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Farchi:Masterzabest20@mydatabase.enc6jmy.mongodb.net/?retryWrites=true&w=majority',
      {
        useUnifiedTopology: true,
      } as any,
    ),
  ],
})
export class DatabaseModule {}
