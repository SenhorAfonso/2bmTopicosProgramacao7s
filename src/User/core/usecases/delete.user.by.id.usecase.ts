import { DeleteUserByIdInputPort } from '../ports/in/delete.user.by.id.input.port';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { UserPersistenceOutputPort } from '../ports/out/persistence/user.persistence.output.port';
import { UserRole } from 'src/common/enums/user.roles';
import { ExceptionMessage } from '../domain/exceptions/exception.message';

@Injectable()
export class DeleteUserByIdUsecase implements DeleteUserByIdInputPort {
  constructor(
    @Inject('UserPersistenceOutputPort')
    private readonly userPersistenceAdapter: UserPersistenceOutputPort,
  ) {}

  async execute(userId: string, owner: string, role: string): Promise<void> {
    if (role === UserRole.Admin) {
      return await this.userPersistenceAdapter.deleteUserById(userId);
    }

    const user = await this.userPersistenceAdapter.getUserById(userId);

    if (user.id !== owner) {
      throw new ForbiddenException(ExceptionMessage.USERS.NOT_OWNER);
    }

    return await this.userPersistenceAdapter.deleteUserById(userId);
  }
}
