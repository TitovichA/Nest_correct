import { Injectable } from '@nestjs/common';
import { CommentDTO } from 'src/api/dto/comment.dto';
import { NewsDTO } from 'src/api/dto/news.dto';
import { NewsService } from '../news/news.service';

@Injectable()
export class CommentsService {
  constructor(private readonly newsService: NewsService) {}

  async getComments(newsId: number): Promise<CommentDTO[]> {
    const news = await this.newsService.getNews(newsId);
    return news.comments;
  }

  async getComment(newsId: number, commentId: number): Promise<CommentDTO> {
    const news = await this.newsService.getNews(newsId);
    return news.comments[commentId];
  }

  async createComment(newsId: number, data: CommentDTO): Promise<CommentDTO> {
    const news = await this.newsService.getNews(newsId);
    news.comments.push(data);
    return data;
  }

  async deleteComment(newsId: number, commentId: number): Promise<NewsDTO> {
    const news = await this.newsService.getNews(newsId);
    const comment = news.comments[commentId];
    if (comment) {
      news.comments.splice(commentId, 1);
      return news;
    } else throw new Error('Comment not found');
  }
}
