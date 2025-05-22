import { UpdateUserModelIn } from '../../domain/models/update.user.model.in';
import { UserModelOut } from '../../domain/models/user.model.out';

export interface UpdateUserByIdInputPort {
  execute(userId: string, newUser: UpdateUserModelIn): Promise<UserModelOut>;
}
