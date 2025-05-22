import { Gender } from 'src/User/adapters/in/enums/Gender';

export class UserModelIn {
  constructor(
    public readonly userName: string,
    public readonly email: string,
    public password: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly confirmPassword: string,
    public readonly dayOfBirth: Date,
    public readonly gender: Gender,
  ) {}
}
