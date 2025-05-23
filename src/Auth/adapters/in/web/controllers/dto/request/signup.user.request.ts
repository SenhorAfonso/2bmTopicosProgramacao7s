import { Gender } from 'src/User/adapters/in/enums/Gender';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { parseDate } from 'src/common/parse.date';
import { UserRole } from 'src/common/enums/user.roles';

export class SignUpUserRequest {
  @IsString({ message: 'First name must be a string' })
  @Matches(/^[A-Za-z]+$/, {
    message:
      'First name must contain only letters. Numbers, special characters or spaces are not allowed',
  })
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  @Matches(/^[A-Za-z]+$/, {
    message:
      'Last name must contain only letters. Numbers, special characters or spaces are not allowed',
  })
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  lastName: string;

  @IsString({ message: 'User name must be a string' })
  @Matches(/^[A-Za-z0-9_]+$/, {
    message:
      'User name must contain only letters, numbers and underscores. Special characters or spaces are not allowed',
  })
  @MinLength(2, { message: 'User name must be at least 2 characters long' })
  userName: string;

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

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password confirmation must be at least 8 characters long and must contain at least one lowercase letter, one uppercase letter, one number and one special character',
    },
  )
  confirmPassword: string;

  @IsDate({
    message:
      'Date of birth must be a valid date. Valid formats are dd/mm/yyyy or yyyy/mm/dd',
  })
  @Transform(({ value }) => parseDate(value), { toClassOnly: true })
  dayOfBirth: Date;

  @IsEnum(Gender)
  @Transform(({ value }) => value.toUpperCase(), { toClassOnly: true })
  gender: Gender;

  @IsEnum(UserRole)
  role: UserRole;
}
