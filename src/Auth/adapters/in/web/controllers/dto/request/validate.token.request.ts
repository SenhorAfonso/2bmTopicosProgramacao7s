import { IsEmail, IsString, Length } from 'class-validator';

export class ValidateTokenRequest {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsString()
  @Length(4, 4, { message: 'Token must be 4 characters long' })
  token: string;
}
