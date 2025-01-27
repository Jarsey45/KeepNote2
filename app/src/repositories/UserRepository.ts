import { User } from '@/entities/User';
import { Note } from '@/entities/Note';
import { BaseRepository } from './BaseRepository';
import { ILike } from 'typeorm';

export class UserRepository extends BaseRepository<User> {
	constructor() {
		super(User);
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.repository.findOne({ where: { email } });
	}

	async findByEmailWithRelations(email: string): Promise<User | null> {
		return this.repository.findOne({ where: { email }, relations: { notes: true } });
	}

	async findByEmailLike(searchEmail: string): Promise<User[]> {
		return this.repository.find({
			where: { email: ILike(`%${searchEmail}%`) },
			select: ['id', 'email', 'nickname'], // Specify the fields you want to select
		});
	}

	async addSharedNote(userId: string, note: Note): Promise<User> {
		const user = await this.repository.findOne({
			where: { id: userId },
			relations: ['sharedNotes'],
		});

		if (!user) throw new Error('User not found');

		user.sharedNotes.push(note);
		return this.repository.save(user);
	}
}
