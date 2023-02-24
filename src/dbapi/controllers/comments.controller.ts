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
import { CommentEntity } from '../database/entities/comment.entity';
import { CommentDTO } from '../dto/comment.dto';
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
  async getComments(): Promise<CommentEntity[]> {
    return this.commentsService.findAll();
  }

  @Get('get-one')
  async getNewsComments(
    @Query()
    query: {
      newsId: number;
    },
  ): Promise<CommentEntity | undefined> {
    return this.commentsService.findById(query.newsId);
  }

  @Post('create')
  async createComment(@Body() data: CommentDTO): Promise<CommentEntity> {
    const entity = { ...new CommentEntity(), ...data };
    return this.commentsService.create(entity);
  }

  @Delete('delete')
  async deleteComment(
    @Body()
    body: {
      id: number;
    },
  ): Promise<CommentEntity | undefined> {
    return this.commentsService.remove(body.id);
  }
}
