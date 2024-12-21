import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	ManyToMany,
} from "typeorm";
import { User, } from "./User";

@Entity()
export class Note {
	@PrimaryGeneratedColumn()
		id!: number;

	@Column()
		title!: string;

	@Column("text")
		content!: string;

	@Column()
		color!: string;

	@ManyToOne(() => User, (user) => user.notes)
		user!: User;

	@CreateDateColumn()
		createdAt!: Date;

	@UpdateDateColumn()
		updatedAt!: Date;

	@Column("simple-array", { nullable: true, })
		tags!: string[];

	@Column({ type: "timestamp", nullable: true, })
		calendarDate!: Date | null;

	@ManyToMany(() => User, (user) => user.sharedNotes)
		sharedWith!: User[];
}
