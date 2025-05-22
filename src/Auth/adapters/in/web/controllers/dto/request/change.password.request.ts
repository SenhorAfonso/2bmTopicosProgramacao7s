import { Matches } from 'class-validator';

export class ChangePasswordRequest {
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must be at least 8 characters long and must contain at least one lowercase letter, one uppercase letter, one number and one special character',
    },
  )
  oldPassword: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'New password must be at least 8 characters long and must contain at least one lowercase letter, one uppercase letter, one number and one special character',
    },
  )
  newPassword: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'New password confirmation must be at least 8 characters long and must contain at least one lowercase letter, one uppercase letter, one number and one special character',
    },
  )
  confirmNewPassword: string;
}
