import { Gender } from 'src/User/adapters/in/enums/Gender';

export class UpdateUserModelIn {
  constructor(
    public readonly userName?: string,
    public readonly password?: string,
    public readonly firstName?: string,
    public readonly lastName?: string,
    public readonly gender?: Gender,
  ) {}
}
