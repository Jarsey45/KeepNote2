import { auth } from '@/auth';
import { initDB } from '@/lib/db';
import { UserRepository } from '@/repositories/UserRepository';
import { BasicResponse } from '@/types/NextResponse';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	try {
		await initDB();
		const session = await auth();

		if (!session?.user?.email)
			return NextResponse.json({
				status: 401,
				body: { message: 'Unauthorized' },
			} as BasicResponse);

		const { searchParams } = new URL(request.url);
		const term = searchParams.get('term');

		if (term === null) {
			return NextResponse.json({
				status: 400,
				body: { message: 'Missing search term' },
			} as BasicResponse);
		}

		const userRepo = new UserRepository();
		const users = await userRepo.findByEmailLike(term);

		const filteredUsers = users.filter((user) => user.email !== session?.user?.email);

		if (users) {
			return NextResponse.json({
				users: filteredUsers,
			});
		}
	} catch (error) {
		console.error(error);
		return NextResponse.error();
	}
}

/**
 * @swagger
 * /api/users/search:
 *   get:
 *     summary: Search users by email
 *     tags: [Users]
 *     parameters:
 *       - name: term
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of matching users
 */
