import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;
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
  profileImage?: string;
}
