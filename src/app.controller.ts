import { Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): object {
		return this.appService.getHello();
	}

	@Get("h")
	postHello(): object {
		return this.appService.getHello();
	}
}
