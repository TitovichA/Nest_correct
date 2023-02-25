import { Module } from '@nestjs/common';
import { CommentsController } from './dbapi/controllers/comments.controller';
import { NewsController } from './dbapi/controllers/news.controller';
import { CommentsModule } from './dbapi/modules/comments/comments.module';
import { NewsModule } from './dbapi/modules/news/news.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DatabaseModule } from './dbapi/database/database.module';
import { RolesController } from './dbapi/roles/roles.controller';
import { AuthController } from './dbapi/auth/auth.controller';
import { AuthModule } from './dbapi/auth/auth.module';
import { SessionsModule } from './dbapi/modules/sessions/sessions.module';
import { RolesModule } from './dbapi/roles/roles.module';
import { Role } from './dbapi/database/entities/role.entity';
import { UsersEntity } from './dbapi/database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, Role]),
    DatabaseModule,
    NewsModule,
    CommentsModule,
    AuthModule,
    RolesModule,
    SessionsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
    }),
  ],
  controllers: [
    NewsController,
    CommentsController,
    AuthController,
    RolesController,
  ],
})
export class AppModule {}
