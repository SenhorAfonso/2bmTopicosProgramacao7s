import { DeleteUserByIdInputPort } from '../ports/in/delete.user.by.id.input.port';
import { Inject, Injectable } from '@nestjs/common';
import { UserPersistenceOutputPort } from '../ports/out/persistence/user.persistence.output.port';

@Injectable()
export class DeleteUserByIdUsecase implements DeleteUserByIdInputPort {
  constructor(
    @Inject('UserPersistenceOutputPort')
    private readonly userPersistenceAdapter: UserPersistenceOutputPort,
  ) {}

  async execute(userId: string): Promise<void> {
    await this.userPersistenceAdapter.deleteUserById(userId);
  }
}
