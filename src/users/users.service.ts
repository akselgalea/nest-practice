import { Injectable, Inject } from "@nestjs/common";
import type { Repository } from "typeorm";
import { User } from "./user.entity";
import { comparePasswords } from "./users.utils";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
	) {}

	findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	getByEmail(email: string): Promise<User> {
		return this.userRepository.findOneBy({ email });
	}

	getById(id: string): Promise<User> {
		return this.userRepository.findOneBy({ id });
	}

	createUser(user: User) {
		return this.userRepository.create(user);
	}

	async login(email: string, password: string) {
		const user = await this.getByEmail(email);

		if (!user) {
			return { status: 404, error: "user not found" };
		}

		const match = await comparePasswords(password, user.password);

		if (!match) {
			return { status: 422, error: "the passwords do not match" };
		}

		return user;
	}
}
