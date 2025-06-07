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
  Request,
  UseGuards,
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
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/role';
import { UserRole } from 'src/common/enums/user.roles';

type userId = {
  id: string;
};

@Controller('users')
@UseGuards(RolesGuard, AuthGuard)
export class UserController {
  constructor(
    @Inject('SaveUserInputPort')
    private readonly saveNewUser: SaveUserInputPort,
    @Inject('GetUserByInputPort')
    private readonly getUserById: GetUserByIdInputPort,
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
  @Roles(UserRole.Admin)
  async createUser(@Body() user: CreateUserRequest) {
    return this.saveNewUser.execute(user);
  }

  @Get()
  @ResponseMessage('All users retrieved!')
  @Roles(UserRole.Admin)
  async getUsers() {
    const data = await this.getAllUsers.execute();
    return data;
  }

  @Get('/:field')
  @Roles(UserRole.Admin)
  @ResponseMessage('Single user retrieved!')
  async getSingleUser(
    @Param('field') field: string,
    @Request() req: { user: { sub: string; role: UserRole } },
  ) {
    const { sub, role } = req.user;
    return this.getUserById.execute(field, sub, role);
  }

  @Put('/:id')
  @ResponseMessage('User updated!')
  @Roles(UserRole.User, UserRole.Admin)
  async updateUser(
    @Param() param: userId,
    @Body() newUser: UpdateUserRequest,
    @Request() req: { user: { sub: string; role: UserRole } },
  ) {
    const { sub, role } = req.user;
    const userModelIn = this.userMapper.UserUpdateRequestToModelIn(newUser);
    return this.updateUserData.execute(param.id, sub, role, userModelIn);
  }

  @Delete('/:id')
  @Roles(UserRole.User, UserRole.Admin)
  @ResponseMessage('', HttpStatus.NO_CONTENT)
  async deleteUser(
    @Param() id: userId,
    @Request() req: { user: { sub: string; role: UserRole } },
  ) {
    const { sub, role } = req.user;
    return this.deleteUserById.execute(id.id, sub, role);
  }
}
