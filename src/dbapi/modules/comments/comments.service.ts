import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../../../dbapi/database/entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepository: Repository<CommentEntity>,
  ) {}

  async findAll(): Promise<CommentEntity[]> {
    return await this.commentsRepository.find({});
  }

  async findById(newsId: number): Promise<CommentEntity[] | undefined> {
    return await this.commentsRepository.find({
      where: { news: newsId },
      relations: ['user'],
    });
  }

  async create(comment: CommentEntity) {
    return await this.commentsRepository.save(comment);
  }

  async remove(id: number) {
    let out;
    const _comment = await this.commentsRepository.findOne({ id });
    if (_comment) {
      out = await this.commentsRepository.remove(_comment);
    }
    return out;
  }
}
