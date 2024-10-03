import { Injectable, Inject, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import type { Repository } from "typeorm";
import { User } from "./user.entity";
import { comparePasswords, encryptPassword } from "./users.utils";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create.input";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
	) { }

	findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	getByEmail(email: string): Promise<User> {
		return this.userRepository.findOneBy({ email });
	}

	getById(id: string): Promise<User> {
		return this.userRepository.findOneBy({ id });
	}

	async createUser(user: CreateUserDto): Promise<User> {
		const usr = await this.getByEmail(user.email)

		if (usr) {
			throw new HttpException("User already exists", HttpStatus.UNPROCESSABLE_ENTITY);
		}

		const password = await encryptPassword(user.password);

		return this.userRepository.save({ ...user, password });
	}

	async login(email: string, password: string) {
		const user = await this.getByEmail(email);

		if (!user) {
			throw new UnauthorizedException();
		}

		const match = await comparePasswords(password, user.password);

		if (!match) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
