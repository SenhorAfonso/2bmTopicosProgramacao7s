import {
  LoginUserInputPort,
  loginUserReturnType,
} from '../ports/in/login.user.input.port';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypy from 'bcrypt';
import { ExceptionMessage } from 'src/User/core/domain/exceptions/exception.message';
import { LoginUserModelIn } from 'src/User/core/domain/models/login.user.model.in';
import { UserPersistenceOutputPort } from 'src/User/core/ports/out/persistence/user.persistence.output.port';

@Injectable()
export class LoginUserUsecase implements LoginUserInputPort {
  constructor(
    @Inject('UserPersistenceOutputPort')
    private readonly userPersistenceAdapter: UserPersistenceOutputPort,
    private readonly jwtService: JwtService,
  ) {}
  async execute(loginUser: LoginUserModelIn): Promise<loginUserReturnType> {
    let access_token: string;
    const { email, password } = loginUser;
    const user = await this.userPersistenceAdapter.getUserBy('email', email);

    const hashedPassword = user.password;

    const passIsValid = await bcrypy.compare(password, hashedPassword);

    if (!passIsValid) {
      throw new BadRequestException(
        ExceptionMessage.AUTH.LOGIN.INVALID_CREDENTIALS,
      );
    }

    const payload = {
      sub: user.id,
      username: user.userName,
      email: user.email,
      role: user.role,
    };

    try {
      access_token = await this.jwtService.signAsync(payload);
    } catch {
      throw new InternalServerErrorException(ExceptionMessage.AUTH.JWT.SIGN);
    }

    return {
      access_token,
      first_name: user.firstName,
      slug: user.id,
    };
  }
}
