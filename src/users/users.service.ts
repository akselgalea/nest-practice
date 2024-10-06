import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { encryptPassword } from "src/auth/auth.utils";
import { RolesEnum } from "src/enums/roles.enum";
import { Role } from "src/roles/role.entity";
import { In, Repository } from "typeorm";
import type { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(Role) private roleRepository: Repository<Role>,
	) { }

	async findAll(): Promise<{ users: User[], totalRows: number }> {
		const [users, totalRows] = await this.userRepository.findAndCount({
			relations: {
				roles: true,
			},
		});

		return { users, totalRows }
	}

	exists(email: string, username: string): Promise<User> {
		return this.userRepository.findOne({
			where: [
				{ email },
				{ username },
			],
			relations: {
				roles: true,
			},
		});
	}

	getByEmailOrUsername(input: string): Promise<User> {
		return this.userRepository.findOne({
			where: [
				{ email: input },
				{ username: input },
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

		const where = {}

		if (hasRoles) {
			id: In(user.roles)
		} else {
			name: RolesEnum.User
		}

		const roles = await this.roleRepository.find({
			where
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

	async update(id: string, user: UpdateUserDto): Promise<User> {
		const usr = await this.getById(id)

		if (!usr) {
			throw new NotFoundException("User not found")
		}

		if (user.roles && typeof user.roles[0] === 'number') {
			user.roles = await this.roleRepository.find({
				where: {
					id: In(user.roles as Array<number>)
				}
			})

			console.log(user.roles)
		}

		return await this.userRepository.save({ ...usr, ...user as Partial<User> })
	}

	async delete(id: string) {
		const user = await this.getById(id)

		if (!user) {
			throw new NotFoundException("User not found")
		}

		const result = await this.userRepository.softDelete(id)


		return { message: "User deleted successfully" }
	}
}
