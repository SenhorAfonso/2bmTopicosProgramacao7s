import { UserModelOut } from '../../domain/models/user.model.out';

export interface GetUserByInputPort {
  execute(field: string, value: string): Promise<UserModelOut>;
}
