import { UserModelIn } from 'src/User/core/domain/models/user.model.in';

export interface SignUpUserInputPort {
  execute(signUpUser: UserModelIn): Promise<{ access_token: string }>;
}
