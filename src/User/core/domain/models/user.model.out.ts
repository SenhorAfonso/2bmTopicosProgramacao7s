import { UserRole } from 'src/common/enums/user.roles';
import { Gender } from 'src/User/adapters/in/enums/Gender';

export class UserModelOut {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly userName: string,
    public readonly email: string,
    public readonly dayOfBirth: string,
    public readonly gender: Gender,
    public readonly role: UserRole,
  ) {}
}
