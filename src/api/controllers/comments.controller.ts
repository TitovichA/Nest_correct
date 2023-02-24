import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Render,
} from '@nestjs/common';
import { DecrementId } from '../../utils/decrement-id.decorator';
import { CommentDTO } from '../dto/comment.dto';
import { NewsDTO } from '../dto/news.dto';
import { CommentsService } from '../modules/comments/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('template')
  @Render('index')
  getTemplate(): { message: string } {
    return { message: 'Hello world!' };
  }

  @Get('/')
  async getComments(
    @Query() @DecrementId(['id']) query: { id: number },
  ): Promise<CommentDTO[]> {
    return this.commentsService.getComments(query.id);
  }

  @Get('get-one')
  async getComment(
    @Query()
    @DecrementId(['newsId', 'commentId'])
    query: {
      newsId: number;
      commentId: number;
    },
  ): Promise<CommentDTO | undefined> {
    return this.commentsService.getComment(query.newsId, query.commentId);
  }

  @Post('create')
  async createComment(
    @Query() @DecrementId(['id']) query: { id: number },
    @Body() data: CommentDTO,
  ): Promise<CommentDTO> {
    return this.commentsService.createComment(query.id, data);
  }

  @Delete('delete')
  async deleteComment(
    @Body()
    @DecrementId(['newsId', 'commentId'])
    body: {
      newsId: number;
      commentId: number;
    },
  ): Promise<NewsDTO> {
    return this.commentsService.deleteComment(body.newsId, body.commentId);
  }
}
