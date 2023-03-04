import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SessionsService } from '../modules/sessions/sessions.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly sessionsService: SessionsService) {}

  async canActivate(context: ExecutionContext) {
    try {
      const client = context.switchToWs().getClient();
      const authToken: string = client.handshake.headers.authorization;

      const session =
        authToken && (await this.sessionsService.getByToken(authToken));
      if (session) {
        const comment = context.getArgByIndex(1);
        comment.user = session.user;

        context.switchToWs().getClient().data.user = session.userId;
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
}
