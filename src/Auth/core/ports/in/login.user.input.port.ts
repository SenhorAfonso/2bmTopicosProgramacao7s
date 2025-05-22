import { LoginUserModelIn } from 'src/User/core/domain/models/login.user.model.in';

export type loginUserReturnType = {
  access_token: string;
  first_name: string;
  slug: string;
};

export interface LoginUserInputPort {
  execute(loginUser: LoginUserModelIn): Promise<loginUserReturnType>;
}
