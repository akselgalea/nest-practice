import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { encryptPassword } from "src/auth/auth.utils";
import { RolesEnum } from "src/enums/roles.enum";
import { Role } from "src/roles/role.entity";
import { In, Repository } from "typeorm";
import type { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(Role) private roleRepository: Repository<Role>,
	) {}

	findAll(): Promise<User[]> {
		return this.userRepository.find({
			relations: {
				roles: true,
			},
		});
	}

	exists(email: string, username: string): Promise<User> {
		return this.userRepository.findOne({
			where: [
				{ email, active: true },
				{ username, active: true },
			],
			relations: {
				roles: true,
			},
		});
	}

	getByEmailOrUsername(input: string): Promise<User> {
		return this.userRepository.findOne({
			where: [
				{ email: input, active: true },
				{ username: input, active: true },
			],
		});
	}

	getById(id: string): Promise<User> {
		return this.userRepository.findOne({
			where: {
				id,
			},
			relations: { roles: true },
		});
	}

	async createUser(user: CreateUserDto): Promise<User> {
		const usr = await this.exists(user.email, user.username);

		if (usr) {
			throw new HttpException(
				"User already exists",
				HttpStatus.UNPROCESSABLE_ENTITY,
			);
		}

		const { name, username, email, active } = user;
		const password = await encryptPassword(user.password);

		const hasRoles = user?.roles !== undefined;

		const roles = await this.roleRepository.findBy({
			name: In(hasRoles && user.roles.length ? user.roles : [RolesEnum.User]),
		});

		return this.userRepository.save({
			name,
			username,
			email,
			password,
			active,
			roles,
		});
	}
}
