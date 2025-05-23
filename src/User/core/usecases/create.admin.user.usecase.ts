import { UserModelIn } from '../domain/models/user.model.in';
import { UserPersistenceOutputPort } from '../ports/out/persistence/user.persistence.output.port';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ExceptionMessage } from '../domain/exceptions/exception.message';
import { Gender } from 'src/User/adapters/in/enums/Gender';
import { UserRole } from 'src/common/enums/user.roles';

@Injectable()
export class CreateAdminUserUsecase {
  constructor(
    @Inject('UserPersistenceOutputPort')
    private readonly userPersistenceAdapter: UserPersistenceOutputPort,
    private readonly config: ConfigService,
  ) {}

  async execute(): Promise<void> {
    const adminUser: UserModelIn = {
      userName: 'admin',
      email: 'admin@example.com',
      password: 'PassWord123@Admin',
      firstName: 'Admin',
      lastName: 'Admin',
      confirmPassword: 'PassWord123@Admin',
      dayOfBirth: new Date('2000-01-01'),
      gender: Gender.MALE,
      role: UserRole.Admin,
    };

    try {
      adminUser.password = await bcrypt.hash(
        adminUser.password,
        this.config.get<string>('BCRYPT_SALT'),
      );
    } catch {
      throw new InternalServerErrorException(ExceptionMessage.BCRYPT.PASS_HASH);
    }

    const adminDocument = await this.userPersistenceAdapter.getUserBy(
      'email',
      adminUser.email,
    );
    await this.userPersistenceAdapter.deleteUserById(adminDocument?.id);
    await this.userPersistenceAdapter.saveUser(adminUser);
  }
}
