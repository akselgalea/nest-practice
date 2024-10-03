import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";

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
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
