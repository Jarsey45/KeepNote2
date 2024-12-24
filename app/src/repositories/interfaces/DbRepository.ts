import { DeepPartial } from 'typeorm';

export default interface DbRepository<T> {
	/**
	 * Finds entity by id
	 * @param id
	 */
	findById(id: string | number): Promise<T | null>;

	/**
	 * Finds all entities
	 */
	findAll(): Promise<T[]>;

	/**
	 * Inserts new entity
	 * @param entity
	 */
	insert(entity: DeepPartial<T>): Promise<T>;

	/**
	 * Updates entity by id
	 * @param id
	 * @param Entity
	 */
	update(id: string | number, entity: Partial<T>): Promise<T | null>;

	/**
	 * Deletes entity by id
	 * @param id
	 */
	delete(id: string | number): Promise<boolean>;
// eslint-disable-next-line semi
};
