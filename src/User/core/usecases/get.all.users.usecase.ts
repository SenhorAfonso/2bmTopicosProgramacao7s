import { GetAllUsersInputPort } from '../ports/in/get.all.users.input.port';
import { UserMapper } from 'src/User/adapters/in/web/dto/user.mapper';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserModelOut } from '../domain/models/user.model.out';
import { UserPersistenceOutputPort } from '../ports/out/persistence/user.persistence.output.port';
import { ExceptionMessage } from '../domain/exceptions/exception.message';

@Injectable()
export class GetAllUsersUsecase implements GetAllUsersInputPort {
  constructor(
    @Inject('UserPersistenceOutputPort')
    private readonly userPersistenceAdapter: UserPersistenceOutputPort,
    private readonly userMapper: UserMapper,
  ) {}

  public async execute(): Promise<UserModelOut[]> {
    const users = await this.userPersistenceAdapter.getAllUsers();

    if (users.length === 0) {
      throw new NotFoundException(ExceptionMessage.USERS.NOT_FOUND);
    }

    return this.userMapper.ArrayOfUserDocumentToUserModelOut(users);
  }
}
