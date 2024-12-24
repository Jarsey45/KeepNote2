import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	ManyToMany,
} from 'typeorm';
import { User } from './User';
import { BaseEntity } from './base.entity';

@Entity()
export class Note extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: number;

	@Column()
	title!: string;

	@Column('text')
	content!: string;

	@Column()
	color!: string;

	@ManyToOne(() => User, (user) => user.notes)
	user!: User;

	@Column('simple-array', { nullable: true })
	tags!: string[];

	@Column({ type: 'timestamp', nullable: true })
	calendarDate!: Date | null;

	@ManyToMany(() => User, (user) => user.sharedNotes)
	sharedWith!: User[];
}
