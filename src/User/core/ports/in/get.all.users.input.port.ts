import { UserModelOut } from '../../domain/models/user.model.out';

export interface GetAllUsersInputPort {
  execute(): Promise<UserModelOut[]>;
}
