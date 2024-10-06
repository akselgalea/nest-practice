import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import type { CreateUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/roles/roles.decorator";
import { RolesEnum } from "src/enums/roles.enum";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
@UseGuards(AuthGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Roles(RolesEnum.Admin)
	@Post()
	createUser(@Body() body: CreateUserDto) {
		console.log(body);
		return this.usersService.createUser(body);
	}

	@Patch(':id')
	updateUser(@Body() body: UpdateUserDto, @Param('id') id: string) {
		return this.usersService.update(id, body)
	}

	@Delete(':id')
	deleteUser(@Param('id') id: string) {
		return this.usersService.delete(id)
	}
}
