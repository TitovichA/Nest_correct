import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from '../../../dbapi/database/entities/news.entity';
import { NewsController } from '../../controllers/news.controller';
import { NewsService } from './news.service';
import { SessionsModule } from '../sessions/sessions.module';
import { UsersEntity } from '../../database/entities/user.entity';
import { Role } from '../../database/entities/role.entity';
import { SocketCommentsGateway } from '../../../ws/socket-comments.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsEntity, UsersEntity, Role]),
    SessionsModule,
  ],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
