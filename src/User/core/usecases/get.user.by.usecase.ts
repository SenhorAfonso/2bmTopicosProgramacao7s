import { UserModelOut } from '../domain/models/user.model.out';
import { UserMapper } from 'src/User/adapters/in/web/dto/user.mapper';
import { UserPersistenceOutputPort } from '../ports/out/persistence/user.persistence.output.port';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ExceptionMessage } from '../domain/exceptions/exception.message';
import { GetUserByInputPort } from '../ports/in/get.user.by.input.port';

type avalableFields = '_id' | 'email' | 'username';

@Injectable()
export class GetUserByUsecase implements GetUserByInputPort {
  constructor(
    @Inject('UserPersistenceOutputPort')
    private readonly userPersistenceAdapter: UserPersistenceOutputPort,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(field: avalableFields, value: string): Promise<UserModelOut> {
    const user = await this.userPersistenceAdapter.getUserBy(field, value);

    if (!user) {
      throw new BadRequestException(ExceptionMessage.USERS.NOT_FOUND);
    }

    return this.userMapper.UserDocumentToUserModelOut(user);
  }
}
