import "reflect-metadata";
import { DataSource } from "typeorm";
import { Note } from './entities/Note';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT || "5432"),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	synchronize: process.env.NODE_ENV === "development",
	logging: process.env.NODE_ENV === "development",
	entities: [Note, User],
	migrations: ["app/lib/migrations/**/*.ts"],
});

let initialized = false;

export async function initDB() {
	if (!initialized) {
		await AppDataSource.initialize();
		initialized = true;
	}
	return AppDataSource;
}
