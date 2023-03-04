import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import base64url from 'base64url';
import { Session } from '../database/entities/session.entity';
import { AuthUserDto } from './dto/auth-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UsersEntity } from '../database/entities/user.entity';
import { Role } from '../database/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,

    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>,

    @InjectRepository(Role)
    private readonly roles: Repository<Role>,
  ) {}

  async login({ login, password }: AuthUserDto) {
    const result = ['Неправильный логин или пароль.', null];
    const user = await this.usersRepository.findOne({ login: login });
    if (!user) {
      return result;
    }
    const { password: userPassword, id: userId } = user;
    const isCorrectPassword = await this.comparePasswords(
      userPassword,
      password,
    );
    if (!isCorrectPassword) {
      return result;
    }
    const accessToken = await this.generateUniqToken();
    const session = new Session();
    session.token = `Bearer ${accessToken}`;
    session.userId = userId;
    await this.sessionsRepository.save(session);
    return [`Вы успешно авторизировались`, session.token];
  }

  async register(params: RegisterUserDto) {
    const { login, password } = params;
    const saltRounds = 10;
    const isLogin = await this.usersRepository.findOne({ login: login });
    if (isLogin) {
      throw new HttpException(
        'The user with this login is already registered',
        HttpStatus.CONFLICT,
      );
    }
    const role = await this.roles.findOne({ value: 'User' });
    const passwordHash = await this.getHashPassword(password, saltRounds);
    const newUser = {
      ...params,
      password: passwordHash,
      roles: [role],
    };
    const result = await this.usersRepository.save(newUser);
    return plainToClass(UserDto, result);
  }

  comparePasswords(userPassword: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, userPassword);
  }

  async getHashPassword(password: string, saltRounds: number): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }

  async generateUniqToken() {
    return this.generateToken();
  }

  generateToken(): Promise<string> {
    const tokenLength = 30;
    return new Promise((resolve, reject) => {
      crypto.randomBytes(tokenLength, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const decodeBase64 = base64url.fromBase64(data.toString('base64'));
          resolve(decodeBase64);
        }
      });
    });
  }
}
