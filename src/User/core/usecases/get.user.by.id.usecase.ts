import { GetUserByIdInputPort } from '../ports/in/get.user.by.id.input.port';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserPersistenceOutputPort } from '../ports/out/persistence/user.persistence.output.port';
import { UserMapper } from 'src/User/adapters/in/web/dto/user.mapper';
import { ExceptionMessage } from '../domain/exceptions/exception.message';
import { UserRole } from 'src/common/enums/user.roles';
import { UserDocument } from 'src/User/adapters/out/persistence/models/user.model';

@Injectable()
export class GetUserByIdUsecase implements GetUserByIdInputPort {
  constructor(
    @Inject('UserPersistenceOutputPort')
    private readonly userPersistenceAdapter: UserPersistenceOutputPort,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(userId: string, owner: string, role: UserRole) {
    let user: UserDocument;
    switch (role) {
      case UserRole.Admin:
        user = await this.userPersistenceAdapter.getUserById(userId);
        return this.userMapper.UserDocumentToUserModelOut(user);
      case UserRole.User:
        if (userId !== owner) {
          throw new NotFoundException(ExceptionMessage.USERS.NOT_FOUND);
        }
        user = await this.userPersistenceAdapter.getUserById(userId);
        return this.userMapper.UserDocumentToUserModelOut(user);
    }
  }
}
