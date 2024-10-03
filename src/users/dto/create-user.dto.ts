import {
	IsArray,
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
} from "class-validator";

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

	@IsOptional()
	@IsBoolean()
	active?: boolean;

	@IsOptional()
	@IsArray()
	roles?: string[];
}
