import { UserRepository } from '@/repositories/UserRepository';
import { User } from '@/entities/User';
import { Note } from '@/entities/Note';
import { AppDataSource } from '@/lib/db';
import { ILike } from 'typeorm';

jest.mock('@/lib/db', () => ({
	AppDataSource: {
		getRepository: jest.fn(),
	},
}));

describe('UserRepository', () => {
	let userRepo: UserRepository;
	const mockRepository = {
		findOne: jest.fn(),
		find: jest.fn(),
		save: jest.fn(),
	};

	beforeEach(() => {
		(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);
		userRepo = new UserRepository();
	});

	describe('findByEmailLike', () => {
		it('finds users with similar email', async () => {
			const searchEmail = 'test';
			const mockUsers = [
				{ id: '1', email: 'test@example.com' },
				{ id: '2', email: 'tester@example.com' },
			];
			mockRepository.find.mockResolvedValue(mockUsers);

			const result = await userRepo.findByEmailLike(searchEmail);
			expect(result).toEqual(mockUsers);
			expect(mockRepository.find).toHaveBeenCalledWith({
				where: { email: ILike(`%${searchEmail}%`) },
				select: ['id', 'email', 'nickname'],
			});
		});
	});

	describe('addSharedNote', () => {
		it('adds shared note to user', async () => {
			const userId = '1';
			const mockNote = { id: '1', title: 'Shared Note' } as Note;
			const mockUser = {
				id: userId,
				sharedNotes: [],
			} as unknown as User;

			mockRepository.findOne.mockResolvedValue(mockUser);
			mockRepository.save.mockResolvedValue({ ...mockUser, sharedNotes: [mockNote] });

			const result = await userRepo.addSharedNote(userId, mockNote);
			expect(result.sharedNotes).toContain(mockNote);
			expect(mockRepository.findOne).toHaveBeenCalledWith({
				where: { id: userId },
				relations: ['sharedNotes'],
			});
		});

		it('throws error if user not found', async () => {
			mockRepository.findOne.mockResolvedValue(null);
			await expect(userRepo.addSharedNote('1', {} as Note)).rejects.toThrow('User not found');
		});
	});
});
