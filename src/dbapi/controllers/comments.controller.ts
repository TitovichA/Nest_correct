import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CommentEntity } from '../database/entities/comment.entity';
import { CommentDTO } from '../dto/comment.dto';
import { CommentsService } from '../modules/comments/comments.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Коментарии')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Получение коментариев' })
  @ApiResponse({ status: 200, type: CommentEntity })
  @ApiQuery({ name: 'newsId', type: String })
  @Get('all')
  async getComments(
    @Query() query: { newsId: string },
  ): Promise<CommentEntity[] | undefined> {
    return this.commentsService.findByNewsId(Number(query.newsId));
  }

  @ApiOperation({ summary: 'Создание коментария' })
  @ApiResponse({ status: 201, type: CommentEntity })
  @ApiBody({ type: CommentDTO })
  @Post('create')
  async createComment(@Body() data: CommentDTO): Promise<CommentEntity> {
    const entity = { ...new CommentEntity(), ...data };
    return this.commentsService.create(entity);
  }

  @ApiOperation({ summary: 'Удаление коментария' })
  @ApiResponse({ status: 200, type: CommentEntity })
  @ApiBody({
    description: 'id новости',
    schema: {
      type: 'number',
      example: { id: 1 },
    },
  })
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
