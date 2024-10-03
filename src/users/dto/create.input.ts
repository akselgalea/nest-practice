import { IsBoolean, IsEmail, IsLowercase, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  active: boolean
}
