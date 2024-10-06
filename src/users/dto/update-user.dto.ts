import { IsString, IsOptional, IsEmail, IsNotEmpty, IsBoolean, IsArray } from "class-validator";
import { Role } from "src/roles/role.entity";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsArray()
  roles?: number[] | Role[];
}
