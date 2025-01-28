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
		const currentUser = await userRepo.findByEmail(session.user.email);

		if (!currentUser) {
			return NextResponse.json({
				status: 404,
				body: { message: 'User not found' },
			} as BasicResponse);
		}


		if (currentUser) {
			return NextResponse.json({
				status: 200,
				body: {
					message: 'User fetched successfully',
					data: currentUser,
				},
			} as BasicResponse);
		}
	} catch (error) {
		console.error(error);
		return NextResponse.error();
	}
}
