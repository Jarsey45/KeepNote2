import { Note } from '@/entities/Note';
import { User } from '@/entities/User';
import { BaseRepository } from './BaseRepository';
import { FindOptionsWhere } from 'typeorm';

interface PaginationParams {
	page: number;
	limit: number;
}

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
		return this.repository
			.createQueryBuilder('note')
			.innerJoinAndSelect('note.sharedWith', 'user')
			.where('user.id = :userId', { userId })
			.getMany();
	}

	async findByIdWithRelations(id: string): Promise<Note | null> {
		return this.repository.findOne({ where: { id }, relations: { user: true } });
	}

	async findByUserWithPagination(user: User, pagination?: PaginationParams): Promise<{ notes: Note[]; total: number }> {
		const query = this.repository.createQueryBuilder('note').where('note.userId = :userId', { userId: user.id });

		const total = await query.getCount();

		if (pagination) {
			const { page, limit } = pagination;
			query.skip((page - 1) * limit).take(limit);
		}

		const notes = await query.getMany();
		return { notes, total };
	}
}
