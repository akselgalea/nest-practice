import { Controller, Post, Req } from "@nestjs/common";
import type { Request } from "express";
import type { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post("auth/login")
	login(@Req() { body }: Request) {
		console.log(body);
		return this.usersService.login("a", "asdasdasd");
	}
}
