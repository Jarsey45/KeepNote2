import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import type { Relation } from 'typeorm';
import { Note } from './Note';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@Column({ default: 'default' })
	role!: 'default' | 'admin';

	@Column({ nullable: true })
	nickname!: string;

	@OneToMany(() => Note, (note) => note.user)
	notes!: Note[];

	@ManyToMany(() => User)
	@JoinTable()
	friends!: Relation<User>[];

	@ManyToMany(() => Note, (note) => note.sharedWith)
	@JoinTable()
	sharedNotes!: Relation<Note>[];
}
