import { NoteRepository } from '@/repositories/NoteRepository';
import { User } from '@/entities/User';
import { AppDataSource } from '@/lib/db';
import { Between } from 'typeorm';

jest.mock('@/lib/db', () => ({
	AppDataSource: {
		getRepository: jest.fn(),
	},
}));

describe('NoteRepository', () => {
	let noteRepo: NoteRepository;
	const mockRepository = {
		find: jest.fn(),
		findOne: jest.fn(),
		findOneBy: jest.fn(),
		findBy: jest.fn(),
		save: jest.fn(),
		createQueryBuilder: jest.fn(),
	};

	beforeEach(() => {
		(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);
		noteRepo = new NoteRepository();
	});

	describe('findByUser', () => {
		it('finds notes by user with relations', async () => {
			const mockUser = { id: '1' } as User;
			const mockNotes = [{ id: '1', title: 'Note 1' }];
			mockRepository.find.mockResolvedValue(mockNotes);

			const result = await noteRepo.findByUser(mockUser);
			expect(result).toEqual(mockNotes);
			expect(mockRepository.find).toHaveBeenCalledWith({
				where: { user: mockUser },
				relations: ['sharedWith'],
			});
		});
	});

	describe('findBetweenDates', () => {
		it('finds notes between dates', async () => {
			const mockUser = { id: '1' } as User;
			const startDate = new Date('2024-01-01');
			const endDate = new Date('2024-01-31');
			const mockNotes = [{ id: '1', title: 'Note 1' }];
			mockRepository.findBy.mockResolvedValue(mockNotes);

			const result = await noteRepo.findBetweenDates(mockUser, startDate, endDate);
			expect(result).toEqual(mockNotes);
			expect(mockRepository.findBy).toHaveBeenCalledWith({
				calendarDate: Between(startDate, endDate),
				user: { id: mockUser.id },
			});
		});
	});
});
