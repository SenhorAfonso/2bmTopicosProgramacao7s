import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoginUserRequest } from 'src/Auth/adapters/in/web/controllers/dto/request/login.user.request';
import { SignUpUserRequest } from 'src/Auth/adapters/in/web/controllers/dto/request/signup.user.request';
import { UserDocument } from 'src/User/adapters/out/persistence/models/user.model';
import { UserModelIn } from 'src/User/core/domain/models/user.model.in';
import { UserModelOut } from 'src/User/core/domain/models/user.model.out';
import { UpdateUserRequest } from './request/update.user.request';
import { UpdateUserModelIn } from 'src/User/core/domain/models/update.user.model.in';
import { LoginUserModelIn } from 'src/User/core/domain/models/login.user.model.in';
import { Gender } from '../../enums/Gender';
import { ExceptionMessage } from 'src/User/core/domain/exceptions/exception.message';
import { ChangePasswordRequest } from 'src/Auth/adapters/in/web/controllers/dto/request/change.password.request';
import { ChangePasswordModelIn } from 'src/User/core/domain/models/change.password.model.in';

@Injectable()
export class UserMapper {
  UserRequestToLoginUserModelIn(request: LoginUserRequest): LoginUserModelIn {
    try {
      return new LoginUserModelIn(
        request.userName,
        request.email,
        request.password,
      );
    } catch {
      throw new InternalServerErrorException(
        ExceptionMessage.USERS.MAPPER.LOGIN_REQUEST_TO_LOGIN_MODEL,
      );
    }
  }

  UserRequestToUserModelIn(request: SignUpUserRequest): UserModelIn {
    try {
      return new UserModelIn(
        request.userName,
        request.email,
        request.password,
        request.firstName,
        request.lastName,
        request.confirmPassword,
        request.dayOfBirth,
        request.gender,
      );
    } catch {
      throw new InternalServerErrorException(
        ExceptionMessage.USERS.MAPPER.SIGNUP_REQUEST_TO_MODEL_IN,
      );
    }
  }

  UserUpdateRequestToModelIn(request: UpdateUserRequest): UpdateUserModelIn {
    try {
      return new UpdateUserModelIn(
        request.userName,
        request.password,
        request.firstName,
        request.lastName,
        request.gender,
      );
    } catch {
      throw new InternalServerErrorException(
        ExceptionMessage.USERS.MAPPER.UPDATE_REQUEST_TO_UPDATE_MODEL,
      );
    }
  }

  UserDocumentToUserModelOut(document: UserDocument): UserModelOut {
    try {
      return new UserModelOut(
        document.id,
        document.firstName,
        document.lastName,
        document.userName,
        document.email,
        document.dayOfBirth,
        document.gender as unknown as Gender,
      );
    } catch {
      throw new InternalServerErrorException(
        ExceptionMessage.USERS.MAPPER.DOCUMENT_TO_MODEL_OUT,
      );
    }
  }

  ArrayOfUserDocumentToUserModelOut(document: UserDocument[]): UserModelOut[] {
    try {
      if (Array.isArray(document)) {
        const userModelOutArray = [];
        document.forEach((document) => {
          userModelOutArray.push(
            new UserModelOut(
              document.id,
              document.firstName,
              document.lastName,
              document.userName,
              document.email,
              document.dayOfBirth,
              document.gender as unknown as Gender,
            ),
          );
        });
        return userModelOutArray;
      }
    } catch {
      throw new InternalServerErrorException(
        ExceptionMessage.USERS.MAPPER.ARRAY_DOCUMENTS_TO_MODEL_OUT,
      );
    }
  }

  ChangePasswordRequestToUserPasswordModelIn(
    request: ChangePasswordRequest,
    userId: string,
  ): ChangePasswordModelIn {
    try {
      return new ChangePasswordModelIn(
        request.oldPassword,
        request.newPassword,
        request.confirmNewPassword,
        userId,
      );
    } catch {
      throw new InternalServerErrorException(
        ExceptionMessage.USERS.MAPPER.CHANGE_PASSWORD_REQUEST_TO_MODEL_IN,
      );
    }
  }
}
