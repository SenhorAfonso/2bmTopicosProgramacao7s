import { InjectModel } from '@nestjs/mongoose';
import { UserPersistenceOutputPort } from 'src/User/core/ports/out/persistence/user.persistence.output.port';
import { User, UserDocument } from './models/user.model';
import { Model } from 'mongoose';
import { UpdateUserModelIn } from 'src/User/core/domain/models/update.user.model.in';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ExceptionMessage } from 'src/User/core/domain/exceptions/exception.message';
import { UserModelIn } from 'src/User/core/domain/models/user.model.in';

@Injectable()
export class UserPersistenceAdapter implements UserPersistenceOutputPort {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async deleteUserById(id: string): Promise<void> {
    try {
      await this.userModel.findByIdAndDelete(id);
    } catch {
      throw new InternalServerErrorException(ExceptionMessage.USERS.DELETE_ID);
    }
  }

  public getAllUsers(): Promise<UserDocument[]> {
    try {
      return this.userModel.find({});
    } catch {
      throw new InternalServerErrorException(ExceptionMessage.USERS.GET_ALL);
    }
  }

  public getUserById(id: string): Promise<UserDocument> {
    try {
      return this.userModel.findById(id);
    } catch {
      throw new InternalServerErrorException(ExceptionMessage.USERS.GET_ID);
    }
  }

  public getUserBy(field: string, value: string): Promise<UserDocument> {
    try {
      return this.userModel.findOne({ [field]: value });
    } catch {
      throw new InternalServerErrorException(ExceptionMessage.USERS.GET_BY);
    }
  }

  public saveUser(user: UserModelIn): Promise<UserDocument> {
    try {
      return this.userModel.create(user);
    } catch {
      throw new InternalServerErrorException(ExceptionMessage.USERS.CREATE);
    }
  }

  public async updateUserById(
    id: string,
    newUser: UpdateUserModelIn,
  ): Promise<UserDocument> {
    const oldUser = await this.userModel.findById(id);

    if (!oldUser) {
      throw new NotFoundException(ExceptionMessage.USERS.GET_ID);
    }

    try {
      oldUser.userName = newUser.userName ?? oldUser.userName;
      oldUser.firstName = newUser.firstName ?? oldUser.firstName;
      oldUser.lastName = newUser.lastName ?? oldUser.lastName;
      oldUser.gender = newUser.gender?.toString() ?? oldUser.gender.toString();
      oldUser.password = newUser.password ?? oldUser.password;
    } catch {
      throw new BadRequestException(
        ExceptionMessage.USERS.UPDATE_INVALID_PAYLOD,
      );
    }

    try {
      return oldUser.save();
    } catch {
      throw new InternalServerErrorException(ExceptionMessage.USERS.UPDATE);
    }
  }
}
