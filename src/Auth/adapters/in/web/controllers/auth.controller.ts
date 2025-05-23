import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  LoginUserInputPort,
  loginUserReturnType,
} from 'src/Auth/core/ports/in/login.user.input.port';
import { SignUpUserInputPort } from 'src/Auth/core/ports/in/signup.user.input.port';
import { LoginUserRequest } from './dto/request/login.user.request';
import { SignUpUserRequest } from './dto/request/signup.user.request';
import { UserMapper } from 'src/User/adapters/in/web/dto/user.mapper';
import { ResponseMessage } from 'src/common/decorators/response.message';
import { ChangePasswordRequest } from './dto/request/change.password.request';
import { ChangePasswordInputPort } from 'src/Auth/core/ports/in/change.password.input.port';
import { IsPublic } from 'src/common/decorators/is.public';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/role';
import { UserRole } from 'src/common/enums/user.roles';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('auth')
@UseGuards(AuthGuard, RolesGuard)
export class AuthController {
  constructor(
    @Inject('SignUpUserInputPort')
    private readonly signUpUsecase: SignUpUserInputPort,
    @Inject('LoginUserInputPort')
    private readonly loginUsecase: LoginUserInputPort,
    @Inject('ChangePasswordInputPort')
    private readonly changePasswordUsecase: ChangePasswordInputPort,
    private readonly userMapper: UserMapper,
  ) {}

  @IsPublic()
  @Post('/login')
  @UsePipes(new ValidationPipe())
  @ResponseMessage('Login successfully', HttpStatus.OK)
  async Login(
    @Body() loginRequest: LoginUserRequest,
  ): Promise<loginUserReturnType> {
    const userModelIn =
      this.userMapper.UserRequestToLoginUserModelIn(loginRequest);
    return this.loginUsecase.execute(userModelIn);
  }

  @Post('/signup')
  @ResponseMessage('Signup successfully', HttpStatus.CREATED)
  @Roles(UserRole.Admin)
  async SignUp(@Body() signUpRequest: SignUpUserRequest) {
    const userModelIn = this.userMapper.UserRequestToUserModelIn(signUpRequest);
    return this.signUpUsecase.execute(userModelIn);
  }

  @Post('/change-password')
  public changePassword(
    @Body() request: ChangePasswordRequest,
    @Request() req: { user: { sub: string } },
  ) {
    const { sub } = req.user;
    const changePasswordModelIn =
      this.userMapper.ChangePasswordRequestToUserPasswordModelIn(request, sub);
    return this.changePasswordUsecase.execute(changePasswordModelIn);
  }
}
