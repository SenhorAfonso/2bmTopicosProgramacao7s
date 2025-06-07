import { UpdateUserByIdInputPort } from '../ports/in/update.user.by.id.input.port';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserPersistenceOutputPort } from '../ports/out/persistence/user.persistence.output.port';
import { UserModelOut } from '../domain/models/user.model.out';
import { UserMapper } from 'src/User/adapters/in/web/dto/user.mapper';
import { UpdateUserModelIn } from '../domain/models/update.user.model.in';
import { ExceptionMessage } from '../domain/exceptions/exception.message';
import { UserRole } from 'src/common/enums/user.roles';

@Injectable()
export class UpdateUserByIdUsecase implements UpdateUserByIdInputPort {
  constructor(
    @Inject('UserPersistenceOutputPort')
    private readonly userPersistenceAdapter: UserPersistenceOutputPort,
    private readonly userMapper: UserMapper,
  ) {}
  async execute(
    userId: string,
    owner: string,
    role: UserRole,
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

    if (role === UserRole.Admin) {
      const user = await this.userPersistenceAdapter.updateUserById(
        userId,
        newInfo,
      );
      return this.userMapper.UserDocumentToUserModelOut(user);
    }

    const user2update = await this.userPersistenceAdapter.getUserById(userId);

    if (user2update.id !== owner) {
      throw new ForbiddenException(ExceptionMessage.USERS.NOT_OWNER);
    }

    const user = await this.userPersistenceAdapter.updateUserById(
      userId,
      newInfo,
    );
    return this.userMapper.UserDocumentToUserModelOut(user);
  }
}
