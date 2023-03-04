import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '../database/entities/comment.entity';
import { CommentsModule } from '../modules/comments/comments.module';
import { CommentsService } from '../modules/comments/comments.service';
import { SessionsModule } from '../modules/sessions/sessions.module';
import { CommentsController } from './comments.controller';

describe('CommentsController', () => {
  let commentsController: CommentsController;
  let commentsService: CommentsService;

  //   beforeEach(async () => {
  //     const moduleRef = await Test.createTestingModule({
  //       controllers: [CommentsController],
  //       providers: [CommentsService],
  //     }).compile();

  //     commentsService = moduleRef.get<CommentsService>(CommentsService);
  //     commentsController = moduleRef.get<CommentsController>(CommentsController);
  //   });

  beforeEach(() => {
    commentsService = new CommentsService(<any>null);
    commentsController = new CommentsController(commentsService);
  });

  describe('getComments', () => {
    it('should return an array of CommentEntity', async () => {
      const result: CommentEntity[] = [];
      jest
        .spyOn(commentsService, 'findByNewsId')
        .mockImplementation(async () => await result);
      expect(await commentsController.getComments({ newsId: '1' })).toBe(
        result,
      );
    });
  });
});
