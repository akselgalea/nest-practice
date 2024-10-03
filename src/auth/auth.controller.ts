import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { LoginDto } from "./dto/login.dto";
import { Public } from "./auth.decorators";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post("login")
	login(@Body() body: LoginDto) {
		console.log(body);
		return this.authService.login(body.email, body.password);
	}

	@Public()
	@Post("register")
	register(@Body() body: RegisterDto) {
		console.log(body);
		return this.authService.register(body);
	}
}
