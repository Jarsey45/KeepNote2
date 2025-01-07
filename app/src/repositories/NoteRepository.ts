import { Note } from '@/entities/Note';
import { User } from '@/entities/User';
import { BaseRepository } from './BaseRepository';
import { FindOptionsWhere } from 'typeorm';

export class NoteRepository extends BaseRepository<Note> {
	constructor() {
		super(Note);
	}

	async findByUser(user: User): Promise<Note[]> {
		return this.repository.find({
			where: { user } as unknown as FindOptionsWhere<Note>,
			relations: ['sharedWith'],
		});
	}

	async findSharedWithUser(userId: string | number): Promise<Note[]> {
		return this.repository.createQueryBuilder('note')
			.innerJoinAndSelect('note.sharedWith', 'user')
			.where('user.id = :userId', { userId })
			.getMany();
	}
}
