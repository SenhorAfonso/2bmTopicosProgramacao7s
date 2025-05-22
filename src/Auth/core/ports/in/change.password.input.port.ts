import { ChangePasswordModelIn } from 'src/User/core/domain/models/change.password.model.in';

export interface ChangePasswordInputPort {
  execute(changePasswordModelIn: ChangePasswordModelIn): Promise<void>;
}
