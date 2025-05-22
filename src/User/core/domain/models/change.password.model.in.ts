export class ChangePasswordModelIn {
  constructor(
    public readonly oldPassword: string,
    public readonly newPassword: string,
    public readonly confirmNewPassword: string,
    public readonly userId: string,
  ) {}
}
