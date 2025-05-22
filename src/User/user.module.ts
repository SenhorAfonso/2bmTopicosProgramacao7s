import { Module } from '@nestjs/common';
import { UserController } from './adapters/in/web/controllers/user.controller';
import { DeleteUserByIdUsecase } from './core/usecases/delete.user.by.id.usecase';
import { GetUserByIdUsecase } from './core/usecases/get.user.by.id.usecase';
import { GetAllUsersUsecase } from './core/usecases/get.all.users.usecase';
import { SaveUserUsecase } from './core/usecases/save.user.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from 'src/User/adapters/out/persistence/models/user.model';
import { UpdateUserByIdUsecase } from './core/usecases/update.user.by.id.usecase';
import { UserPersistenceAdapter } from './adapters/out/persistence/user.persistence.adapter';
import { UserMapper } from './adapters/in/web/dto/user.mapper';
import { GetUserByUsecase } from './core/usecases/get.user.by.usecase';

@Module({
  controllers: [UserController],
  providers: [
    UserMapper,
    {
      provide: 'UserPersistenceOutputPort',
      useClass: UserPersistenceAdapter,
    },
    {
      provide: 'DeleteUserByIdInputPort',
      useClass: DeleteUserByIdUsecase,
    },
    {
      provide: 'GetUserByIdInputPort',
      useClass: GetUserByIdUsecase,
    },
    {
      provide: 'GetAllUsersInputPort',
      useClass: GetAllUsersUsecase,
    },
    {
      provide: 'SaveUserInputPort',
      useClass: SaveUserUsecase,
    },
    {
      provide: 'UpdateUserByIdInputPort',
      useClass: UpdateUserByIdUsecase,
    },
    {
      provide: 'GetUserByInputPort',
      useClass: GetUserByUsecase,
    },
  ],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [
    {
      provide: 'GetUserByInputPort',
      useClass: GetUserByUsecase,
    },
    {
      provide: 'SaveUserInputPort',
      useClass: SaveUserUsecase,
    },
    {
      provide: 'UserPersistenceOutputPort',
      useClass: UserPersistenceAdapter,
    },
    {
      provide: 'GetUserByInputPort',
      useClass: GetUserByUsecase,
    },
    {
      provide: 'GetUserByIdInputPort',
      useClass: GetUserByIdUsecase,
    },
  ],
})
export class UserModule {}
