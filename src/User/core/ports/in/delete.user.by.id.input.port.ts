import { UserRole } from 'src/common/enums/user.roles';

export interface DeleteUserByIdInputPort {
  execute(userId: string, owner: string, role: UserRole): Promise<void>;
}
