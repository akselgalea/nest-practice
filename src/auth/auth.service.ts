import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { comparePasswords, encryptPassword } from "./auth.utils";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async login(emailOrUsername: string, pass: string) {
		const user = await this.usersService.getByEmailOrUsername(emailOrUsername);

		if (!user) {
			throw new UnauthorizedException();
		}

		const match = await comparePasswords(pass, user.password);

		if (!match) {
			throw new UnauthorizedException();
		}

		return {
			access_token: await this.jwtService.signAsync({
				sub: user.id,
				roles: user.roles,
			}),
			user: {
				username: user.username,
				name: user.name,
				roles: user.roles,
				email: user.email,
			},
		};
	}

	async register(data: RegisterDto) {
		const user = await this.usersService.createUser(data);

		return {
			access_token: await this.jwtService.signAsync({
				sub: user.id,
				roles: user.roles,
			}),
			user: {
				username: user.username,
				name: user.name,
				roles: user.roles,
				email: user.email,
			},
		};
	}
}
