import {
  Body,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserToken } from '../entities/user_token.entity';

@EntityRepository(UserToken)
export class UserTokenRepository extends Repository<UserToken>{}