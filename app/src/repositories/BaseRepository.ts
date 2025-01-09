import { DeepPartial, EntityTarget, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';

import DbRepository from '@/repositories/interfaces/DbRepository';
import { AppDataSource } from '@/lib/db';

export class BaseRepository<T extends ObjectLiteral> implements DbRepository<T> {
	protected repository: Repository<T>;

	constructor(private readonly entity: EntityTarget<T>) {
		this.repository = AppDataSource.getRepository(entity);
	}

	async findById(id: string | number): Promise<T | null> {
		return this.repository.findOneBy({ id } as unknown as FindOptionsWhere<T>);
	}

	async findAll(): Promise<T[]> {
		return this.repository.find();
	}

	async insert(data: DeepPartial<T>): Promise<T> {
		const entity = this.repository.create(data);
		return this.repository.save(entity);
	}

	async update(id: string | number, entity: Partial<T>): Promise<T | null> {
		await this.repository.update(id, entity);
		return this.findById(id);
	}

	async delete(id: string | number): Promise<boolean> {
		const result = await this.repository.delete(id);
		return (result.affected ?? 0) > 0;
	}
}
