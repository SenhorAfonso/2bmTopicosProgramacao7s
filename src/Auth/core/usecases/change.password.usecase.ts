import { ChangePasswordModelIn } from 'src/User/core/domain/models/change.password.model.in';
import { ChangePasswordInputPort } from '../ports/in/change.password.input.port';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ExceptionMessage } from 'src/User/core/domain/exceptions/exception.message';
import { ConfigService } from '@nestjs/config';
import { UserPersistenceOutputPort } from 'src/User/core/ports/out/persistence/user.persistence.output.port';

@Injectable()
export class ChangePasswordUsecase implements ChangePasswordInputPort {
  constructor(
    @Inject('UserPersistenceOutputPort')
    private readonly userPersistenceAdapter: UserPersistenceOutputPort,
    private readonly config: ConfigService,
  ) {}

  async execute(changePasswordModelIn: ChangePasswordModelIn) {
    if (
      changePasswordModelIn.newPassword !==
      changePasswordModelIn.confirmNewPassword
    ) {
      throw new BadRequestException(
        ExceptionMessage.AUTH.SIGNUP.PASSWORD_MISMATCH,
      );
    }

    const user = await this.userPersistenceAdapter.getUserById(
      changePasswordModelIn.userId,
    );

    const passwordsMatch = await bcrypt.compare(
      changePasswordModelIn.oldPassword,
      user.password,
    );

    if (!passwordsMatch) {
      throw new BadRequestException(
        ExceptionMessage.AUTH.CHANGE_PASSWORD.INVALID_PASSWORD,
      );
    }

    const newPassword = await bcrypt.hash(
      changePasswordModelIn.newPassword,
      this.config.get<string>('BCRYPT_SALT'),
    );

    if (user.password === newPassword) {
      throw new BadRequestException(
        ExceptionMessage.AUTH.CHANGE_PASSWORD.SAME_PASSWORD,
      );
    }

    await this.userPersistenceAdapter.updateUserById(
      changePasswordModelIn.userId,
      { password: newPassword },
    );
  }
}
