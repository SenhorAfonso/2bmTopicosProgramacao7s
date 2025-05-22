import { IsEmail } from 'class-validator';

export class ValidateEmailRequest {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;
}
