import { IsEmail, IsString, Matches } from 'class-validator';

export class LoginUserRequest {
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must be at least 8 characters long and must contain at least one lowercase letter, one uppercase letter, one number and one special character',
    },
  )
  password: string;
}
