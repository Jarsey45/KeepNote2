import { auth } from '@/auth';
import { initDB } from '@/lib/db';
import { UserRepository } from '@/repositories/UserRepository';
import { BasicResponse } from '@/types/NextResponse';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		await initDB();
		const session = await auth();

		if (!session?.user?.email)
			return NextResponse.json({
				status: 401,
				body: { message: 'Unauthorized' },
			} as BasicResponse);

		const userRepo = new UserRepository();
		const users = await userRepo.findAll();

		const filteredUsers = users.filter((user) => user.email !== session?.user?.email);

		if (users) {
			return NextResponse.json({
				status: 200,
				body: {
					message: "Successfully fetched all users",
					data: filteredUsers,
				},
			} as BasicResponse);
		}
	} catch (error) {
		console.error(error);
		return NextResponse.error();
	}
}


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
