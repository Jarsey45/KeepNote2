// jest really do not like pg module

import { initDB } from '@/lib/db';

describe('Database Connection', () => {
	beforeAll(() => {
		process.env.DB_HOST = 'postgres';
		process.env.DB_PORT = '5432';
		process.env.DB_USER = 'postgres';
		process.env.DB_PASSWORD = 'postgres';
		process.env.DB_NAME = 'keepnote';
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should initialize database connection only once', async () => {
		const first = await initDB();
		const second = await initDB();

		expect(first.initialize).toHaveBeenCalledTimes(1);
		expect(first).toBe(second);
	});
});
