import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import { User } from './User';
import { BaseEntity } from './base.entity';

@Entity()
export class Note extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	title!: string;

	@Column('text')
	content!: string;

	@Column()
	color!: string;

	@ManyToOne(() => User, (user) => user.notes, { onDelete: 'CASCADE' })
	user!: Relation<User>;

	@Column('simple-array', { nullable: true })
	tags!: string[];

	@Column({ type: 'timestamp', nullable: true })
	calendarDate!: Date | null;

	@ManyToMany(() => User, (user) => user.sharedNotes, { onDelete: 'CASCADE' })
	sharedWith!: Relation<User>[];
}
