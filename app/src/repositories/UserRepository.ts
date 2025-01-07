import { User } from '@/entities/User';
import { BaseRepository } from './BaseRepository';
import { Note } from '@/entities/Note';

interface PaginationParams {
	page: number;
	limit: number;
}

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

	async findNotesWithPagination(user: User, pagination?: PaginationParams): Promise<{ notes: Note[]; total: number }> {
		const query = await this.repository
			.createQueryBuilder('user')
			.where({ email: user.email })
			.leftJoinAndSelect('user.notes', 'notes');

		if (pagination) {
			const { page, limit } = pagination;
			const skip = (page - 1) * limit;

			query.skip(skip).take(limit);
		}

		const notes = (await query.getMany()).at(0)?.notes ?? [];
		const total = await query.getCount();

		return { notes, total };
	}
}
