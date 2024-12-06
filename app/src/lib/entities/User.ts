import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	ManyToMany,
	JoinTable,
} from "typeorm";
import { Note } from "./Note";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@Column({ default: "default" })
	role!: "default" | "admin";

	@OneToMany(() => Note, (note) => note.user)
	notes!: Note[];

	@ManyToMany(() => User)
	@JoinTable()
	friends!: User[];
}
