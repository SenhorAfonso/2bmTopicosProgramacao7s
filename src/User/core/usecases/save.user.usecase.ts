import { SaveUserInputPort } from '../ports/in/save.user.input.port';
import { UserModelIn } from '../domain/models/user.model.in';
import { UserModelOut } from '../domain/models/user.model.out';
import { UserMapper } from 'src/User/adapters/in/web/dto/user.mapper';
import { UserPersistenceOutputPort } from '../ports/out/persistence/user.persistence.output.port';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ExceptionMessage } from '../domain/exceptions/exception.message';

@Injectable()
export class SaveUserUsecase implements SaveUserInputPort {
  constructor(
    @Inject('UserPersistenceOutputPort')
    private readonly userPersistenceAdapter: UserPersistenceOutputPort,
    private readonly userMapper: UserMapper,
    private readonly config: ConfigService,
  ) {}

  async execute(newUser: UserModelIn): Promise<UserModelOut> {
    if (newUser.password !== newUser.confirmPassword) {
      throw new BadRequestException(
        ExceptionMessage.AUTH.SIGNUP.PASSWORD_MISMATCH,
      );
    }

    const [emailExist, usernameExist] = await Promise.all([
      this.userPersistenceAdapter.getUserBy('email', newUser.email),
      this.userPersistenceAdapter.getUserBy('username', newUser.userName),
    ]);

    if (emailExist) {
      throw new BadRequestException(ExceptionMessage.AUTH.SIGNUP.EMAIL_TAKEN);
    }

    if (usernameExist) {
      throw new BadRequestException(
        ExceptionMessage.AUTH.SIGNUP.USERNAME_TAKEN,
      );
    }

    try {
      newUser.password = await bcrypt.hash(
        newUser.password,
        this.config.get<string>('BCRYPT_SALT'),
      );
    } catch {
      throw new InternalServerErrorException(ExceptionMessage.BCRYPT.PASS_HASH);
    }

    const userDocument = await this.userPersistenceAdapter.saveUser(newUser);
    return this.userMapper.UserDocumentToUserModelOut(userDocument);
  }
}
