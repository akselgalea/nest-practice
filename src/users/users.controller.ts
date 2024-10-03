import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { LoginDto } from "./dto/auth/login.input";
import { CreateUserDto } from "./dto/create.input";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Post("auth/login")
	login(@Body() body: LoginDto) {
		console.log(body);
		return this.usersService.login(body.email, body.password);
	}

	@Post()
	createUser(@Body() body: CreateUserDto) {
		console.log(body);
		return this.usersService.createUser(body);
	}
}
