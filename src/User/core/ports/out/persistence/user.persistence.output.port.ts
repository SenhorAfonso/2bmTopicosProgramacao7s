import { UserDocument } from 'src/User/adapters/out/persistence/models/user.model';
import { UpdateUserModelIn } from 'src/User/core/domain/models/update.user.model.in';
import { UserModelIn } from 'src/User/core/domain/models/user.model.in';

export interface UserPersistenceOutputPort {
  saveUser(user: UserModelIn): Promise<UserDocument>;
  getAllUsers(): Promise<UserDocument[]>;
  getUserBy(key: string, value: string): Promise<UserDocument>;
  getUserById(id: string): Promise<UserDocument>;
  updateUserById(id: string, user: UpdateUserModelIn): Promise<UserDocument>;
  deleteUserById(id: string): Promise<void>;
}
