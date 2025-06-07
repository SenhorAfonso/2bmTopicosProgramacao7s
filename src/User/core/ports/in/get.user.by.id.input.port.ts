import { UserModelOut } from '../../domain/models/user.model.out';

export interface GetUserByIdInputPort {
  execute(userId: string, sub: string, role: string): Promise<UserModelOut>;
}
