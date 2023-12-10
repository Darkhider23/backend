import { WorkModule } from './work/work.module';
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    DatabaseModule,
    WorkModule,
    MulterModule.register({
      dest: './uploads', 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
