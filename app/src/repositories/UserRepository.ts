import { User } from '@/entities/User';
import { BaseRepository } from './BaseRepository';

export class UserRepository extends BaseRepository<User> {
	constructor() {
		super(User);
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.repository.findOne({ where: { email } });
	}
}
