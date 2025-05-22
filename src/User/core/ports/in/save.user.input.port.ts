import { UserModelOut } from '../../domain/models/user.model.out';
import { UserModelIn } from '../../domain/models/user.model.in';

export interface SaveUserInputPort {
  execute(newUser: UserModelIn): Promise<UserModelOut>;
}
