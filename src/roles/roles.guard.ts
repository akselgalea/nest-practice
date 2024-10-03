import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { RolesEnum } from "src/enums/roles.enum";
import { ROLES_KEY } from "./roles.decorator";
import type { Role } from "./role.entity";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.getAllAndOverride<RolesEnum[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (!roles) {
			return true;
		}

		const { user } = context.switchToHttp().getRequest();

		return roles.some((role) => user.roles?.some((r: Role) => r.name === role));
	}
}
