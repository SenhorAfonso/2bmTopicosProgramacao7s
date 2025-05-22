import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/User/adapters/in/enums/Gender';

export class UpdateUserRequest {
  @IsString({ message: 'First name must be a string' })
  @Matches(/^[A-Za-z]+$/, {
    message:
      'First name must contain only letters. Numbers, special characters or spaces are not allowed',
  })
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  @IsOptional()
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  @Matches(/^[A-Za-z]+$/, {
    message:
      'Last name must contain only letters. Numbers, special characters or spaces are not allowed',
  })
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must be at least 8 characters long and must contain at least one lowercase letter, one uppercase letter, one number and one special character',
    },
  )
  password: string;

  @IsString({ message: 'User name must be a string' })
  @IsOptional()
  @Matches(/^[A-Za-z0-9_]+$/, {
    message:
      'User name must contain only letters, numbers and underscores. Special characters or spaces are not allowed',
  })
  @MinLength(2, { message: 'User name must be at least 2 characters long' })
  userName: string;

  @IsOptional()
  @IsEnum(Gender)
  @Transform(({ value }) => value.toUpperCase(), { toClassOnly: true })
  gender?: Gender;
}
