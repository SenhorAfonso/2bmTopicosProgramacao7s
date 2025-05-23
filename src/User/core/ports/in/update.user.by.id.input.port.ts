import { UserRole } from 'src/common/enums/user.roles';
import { UpdateUserModelIn } from '../../domain/models/update.user.model.in';
import { UserModelOut } from '../../domain/models/user.model.out';

export interface UpdateUserByIdInputPort {
  execute(
    userId: string,
    owner: string,
    role: UserRole,
    newUser: UpdateUserModelIn,
  ): Promise<UserModelOut>;
}
