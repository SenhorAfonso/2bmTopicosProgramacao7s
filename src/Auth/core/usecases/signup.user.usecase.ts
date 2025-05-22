import { UserModelIn } from 'src/User/core/domain/models/user.model.in';
import { SignUpUserInputPort } from '../ports/in/signup.user.input.port';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SaveUserInputPort } from 'src/User/core/ports/in/save.user.input.port';
import { JwtService } from '@nestjs/jwt';
import { ExceptionMessage } from 'src/User/core/domain/exceptions/exception.message';

@Injectable()
export class SignUpUserUsecase implements SignUpUserInputPort {
  constructor(
    @Inject('SaveUserInputPort') private readonly saveUser: SaveUserInputPort,
    private readonly jwtService: JwtService,
  ) {}

  async execute(signUpUser: UserModelIn): Promise<{ access_token: string }> {
    const newUser = await this.saveUser.execute(signUpUser);

    const payload = {
      sub: newUser.id,
      username: newUser.userName,
      email: newUser.email,
    };

    let access_token: string;

    try {
      access_token = await this.jwtService.signAsync(payload);
    } catch {
      throw new InternalServerErrorException(ExceptionMessage.AUTH.JWT.SIGN);
    }

    return {
      access_token,
    };
  }
}
