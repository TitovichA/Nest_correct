import { Module } from '@nestjs/common';
import { CommentsController } from './dbapi/controllers/comments.controller';
import { NewsController } from './dbapi/controllers/news.controller';
import { CommentsModule } from './dbapi/modules/comments/comments.module';
import { NewsModule } from './dbapi/modules/news/news.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailModule } from './mail/mail.module';
import { MailController } from './mail/mail.controller';
import { DatabaseModule } from './dbapi/database/database.module';

@Module({
  imports: [
    DatabaseModule,
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
