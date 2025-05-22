import { UpdateUserByIdInputPort } from '../ports/in/update.user.by.id.input.port';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserPersistenceOutputPort } from '../ports/out/persistence/user.persistence.output.port';
import { UserModelOut } from '../domain/models/user.model.out';
import { UserMapper } from 'src/User/adapters/in/web/dto/user.mapper';
import { UpdateUserModelIn } from '../domain/models/update.user.model.in';
import { ExceptionMessage } from '../domain/exceptions/exception.message';

@Injectable()
export class UpdateUserByIdUsecase implements UpdateUserByIdInputPort {
  constructor(
    @Inject('UserPersistenceOutputPort')
    private readonly userPersistenceAdapter: UserPersistenceOutputPort,
    private readonly userMapper: UserMapper,
  ) {}
  async execute(
    userId: string,
    newInfo: UpdateUserModelIn,
  ): Promise<UserModelOut> {
    const usernameAlreadyExists = await this.userPersistenceAdapter.getUserBy(
      'userName',
      newInfo.userName,
    );

    if (usernameAlreadyExists) {
      throw new BadRequestException(
        ExceptionMessage.AUTH.SIGNUP.USERNAME_TAKEN,
      );
    }

    const user = await this.userPersistenceAdapter.updateUserById(
      userId,
      newInfo,
    );
    return this.userMapper.UserDocumentToUserModelOut(user);
  }
}
