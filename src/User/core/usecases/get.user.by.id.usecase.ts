import { GetUserByIdInputPort } from '../ports/in/get.user.by.id.input.port';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserPersistenceOutputPort } from '../ports/out/persistence/user.persistence.output.port';
import { UserMapper } from 'src/User/adapters/in/web/dto/user.mapper';
import { ExceptionMessage } from '../domain/exceptions/exception.message';

@Injectable()
export class GetUserByIdUsecase implements GetUserByIdInputPort {
  constructor(
    @Inject('UserPersistenceOutputPort')
    private readonly userPersistenceAdapter: UserPersistenceOutputPort,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(userId: string) {
    const user = await this.userPersistenceAdapter.getUserById(userId);

    if (!user) {
      throw new NotFoundException(ExceptionMessage.USERS.NOT_FOUND);
    }

    return this.userMapper.UserDocumentToUserModelOut(user);
  }
}
