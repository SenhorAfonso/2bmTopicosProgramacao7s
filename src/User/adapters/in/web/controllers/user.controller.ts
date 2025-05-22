import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GetAllUsersInputPort } from 'src/User/core/ports/in/get.all.users.input.port';
import { SaveUserInputPort } from 'src/User/core/ports/in/save.user.input.port';
import { UpdateUserByIdInputPort } from 'src/User/core/ports/in/update.user.by.id.input.port';
import { ResponseMessage } from '../../../../../common/decorators/response.message';
import { CreateUserRequest } from '../dto/request/create.user.request';
import { UpdateUserRequest } from '../dto/request/update.user.request';
import { UserMapper } from '../dto/user.mapper';
import { GetUserByIdInputPort } from 'src/User/core/ports/in/get.user.by.id.input.port';
import { DeleteUserByIdInputPort } from 'src/User/core/ports/in/delete.user.by.id.input.port';

type userId = {
  id: string;
};

@Controller('users')
export class UserController {
  constructor(
    @Inject('SaveUserInputPort')
    private readonly saveNewUser: SaveUserInputPort,
    @Inject('GetUserByInputPort')
    private readonly getUserBy: GetUserByIdInputPort,
    @Inject('GetAllUsersInputPort')
    private readonly getAllUsers: GetAllUsersInputPort,
    @Inject('DeleteUserByIdInputPort')
    private readonly deleteUserById: DeleteUserByIdInputPort,
    @Inject('UpdateUserByIdInputPort')
    private readonly updateUserData: UpdateUserByIdInputPort,
    private readonly userMapper: UserMapper,
  ) {}

  @Post()
  @ResponseMessage('User created!', HttpStatus.CREATED)
  async createUser(@Body() user: CreateUserRequest) {
    return this.saveNewUser.execute(user);
  }

  @Get()
  @ResponseMessage('All users retrieved!')
  async getUsers() {
    const data = await this.getAllUsers.execute();
    return data;
  }

  @Get('/:field')
  @ResponseMessage('Single user retrieved!')
  async getUser(@Param('field') field: string) {
    return this.getUserBy.execute(field);
  }

  @Put('/:id')
  @ResponseMessage('User updated!')
  async updateUser(@Param() param: userId, @Body() newUser: UpdateUserRequest) {
    const userModelIn = this.userMapper.UserUpdateRequestToModelIn(newUser);
    return this.updateUserData.execute(param.id, userModelIn);
  }

  @Delete('/:id')
  @ResponseMessage('', HttpStatus.NO_CONTENT)
  async deleteUser(@Param() id: userId) {
    return this.deleteUserById.execute(id.id);
  }
}
