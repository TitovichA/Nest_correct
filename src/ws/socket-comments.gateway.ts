import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { WsJwtGuard } from '../dbapi/auth/ws-jwt.guard';
import { CommentsService } from '../dbapi/modules/comments/comments.service';
import { CommentEntity } from '../dbapi/database/entities/comment.entity';
import { CommentDTO } from '../dbapi/dto/comment.dto';
import { NewsService } from '../dbapi/modules/news/news.service';

export type Comment = { message: string; idNews: number };

@WebSocketGateway()
export class SocketCommentsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly commentsService: CommentsService,
    private readonly newsService: NewsService,
  ) {}

  @WebSocketServer()
  server!: Server;
  private logger: Logger = new Logger('AppGateway');

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('addComment')
  async handleMessage(client: Socket, comment: CommentDTO): Promise<void> {
    const entity = new CommentEntity();

    const news = await this.newsService.findById(comment.newsId);
    entity.news = <any>news;
    entity.text = comment.text;
    entity.user = comment.user;

    const _comment = await this.commentsService.create(entity);
    this.server.to(comment.newsId.toString()).emit('newComment', _comment);
  }

  afterInit(server: Server): void {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<void> {
    const { newsId } = client.handshake.query;
    client.join(newsId || '');
    this.logger.log(`Client connected: ${client.id}`);
  }
}
