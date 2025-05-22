import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class LoginUserRequest {
  @IsString({ message: 'Username must be a string' })
  @Matches(/^[A-Za-z0-9_]+$/, {
    message:
      'Username must contain only letters, numbers and underscores. Special characters or spaces are not allowed',
  })
  @MinLength(2, { message: 'Username must be at least 2 characters long' })
  userName?: string;

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
