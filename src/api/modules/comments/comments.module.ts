import { Module } from '@nestjs/common';
import { NewsController } from '../../controllers/news.controller';
import { NewsModule } from '../news/news.module';
import { CommentsService } from './comments.service';

@Module({
  imports: [NewsModule],
  controllers: [NewsController],
  providers: [Array, CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
