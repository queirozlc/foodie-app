import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInUserDto {
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail(undefined, {
    message: 'Email is invalid',
  })
  email: string;
  @IsNotEmpty({
    message: 'Password is required',
  })
  password: string;
}
