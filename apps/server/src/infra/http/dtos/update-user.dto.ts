import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail(undefined, {
    message: 'Email is not valid',
  })
  email: string;
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;
  profileImage?: string;
}
