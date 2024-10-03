import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { RolesGuard } from "./roles/roles.guard";
import { UsersModule } from "./users/users.module";
import { AuthGuard } from "./auth/auth.guard";

@Module({
	imports: [
		UsersModule,
		TypeOrmModule.forRoot({
			type: "postgres",
			host: `${process.env.DB_HOST}`,
			port: Number(process.env.DB_PORT),
			username: `${process.env.DB_USERNAME}`,
			password: `${process.env.DB_PASSWORD}`,
			database: `${process.env.DB_NAME}`,
			synchronize: true,
			logging: true,
			entities: [`${__dirname}/**/*.entity{.ts,.js}`],
			subscribers: [],
			migrations: [],
		}),
		AuthModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
	],
})
export class AppModule {}
