import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../database/entities/user.entity';
import { SessionsService } from '../modules/sessions/sessions.service';
import { Role } from '../database/entities/role.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly sessionsService: SessionsService,

    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,

    private reflector: Reflector,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      let canActivate = false;

      const requiredRoles = await this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const request = await context.switchToHttp().getRequest();
      const accessToken = request.headers['authorization'];
      if (!accessToken) {
        throw new UnauthorizedException();
      }
      const session = await this.sessionsService.getByToken(accessToken);
      if (!session) {
        throw new UnauthorizedException();
      }
      request.userId = session.userId;
      const user = await this.userRepository.findOne({
        where: { id: session.userId },
        relations: ['roles'],
      });
      if (!user) {
        throw new NotFoundException();
      }
      request.user = user;

      for (const r of user.roles) {
        const role = await this.roleRepository.findOneOrFail(r.id);
        canActivate = requiredRoles.includes(role.value);
        if (canActivate) break;
      }
      return canActivate;
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
}
