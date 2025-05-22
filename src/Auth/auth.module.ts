import { Module } from '@nestjs/common';
import { AuthController } from './adapters/in/web/controllers/auth.controller';
import { LoginUserUsecase } from './core/usecases/login.user.usecase';
import { SignUpUserUsecase } from './core/usecases/signup.user.usecase';
import { UserModule } from 'src/User/user.module';
import { UserMapper } from 'src/User/adapters/in/web/dto/user.mapper';
import { ChangePasswordUsecase } from './core/usecases/change.password.usecase';
import { AUTH_GUARD, AuthGuard } from 'src/common/guards/auth.guard';
import { GetUserByUsecase } from 'src/User/core/usecases/get.user.by.usecase';

@Module({
  controllers: [AuthController],
  providers: [
    UserMapper,
    {
      provide: 'LoginUserInputPort',
      useClass: LoginUserUsecase,
    },
    {
      provide: 'SignUpUserInputPort',
      useClass: SignUpUserUsecase,
    },
    {
      provide: 'ChangePasswordInputPort',
      useClass: ChangePasswordUsecase,
    },
    {
      provide: 'GetUserByInputPort',
      useClass: GetUserByUsecase,
    },
    {
      provide: AUTH_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [UserModule],
})
export class AuthModule {}
