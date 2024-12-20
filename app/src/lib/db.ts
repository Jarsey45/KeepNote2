import "reflect-metadata";
import { DataSource } from "typeorm";
import { Note } from "../entities/Note";
import { User } from "../entities/User";
import dotenv from 'dotenv';

dotenv.config();

// console.log('Database connection details:', {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   // Don't log the actual password
//   hasPassword: !!process.env.DB_PASSWORD
// });

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
	migrations: ["app/src/migrations/**/*.ts"],
	migrationsTableName: "app",
});

let initialized = false;

async function initDB() {
	if (!initialized) {
		await AppDataSource.initialize();
		initialized = true;
	}
	return AppDataSource;
}

