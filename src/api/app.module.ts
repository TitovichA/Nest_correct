import { Module } from '@nestjs/common';
import { CommentsController } from './controllers/comments.controller';
import { NewsController } from './controllers/news.controller';
import { CommentsModule } from './modules/comments/comments.module';
import { NewsModule } from './modules/news/news.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailModule } from '../mail/mail.module';
import { MailController } from '../mail/mail.controller';

@Module({
  imports: [
    NewsModule,
    CommentsModule,
    MailModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
    }),
  ],
  controllers: [NewsController, CommentsController, MailController],
})
export class AppModule {}
