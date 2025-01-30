import { auth } from '@/auth';
import { initDB } from '@/lib/db';
import { UserRepository } from '@/repositories/UserRepository';
import { BasicResponse } from '@/types/NextResponse';
import { NextResponse } from 'next/server';

interface SlugIDParams {
	params: Promise<{ id: string }>;
}

//TODO: fix redundancy

export async function DELETE(request: Request, { params }: SlugIDParams) {
	try {
		await initDB();

		const session = await auth();
		if (!session?.user?.email)
			return NextResponse.json({
				status: 401,
				body: { message: 'Unauthorized' },
			} as BasicResponse);

		const userRepo = new UserRepository();
		const user = await userRepo.findByEmail(session.user.email ?? '');
		if (!user)
			return NextResponse.json({
				status: 400,
				body: { message: 'User not found' },
			} as BasicResponse);

		if (user.role !== 'admin')
			return NextResponse.json({
				status: 401,
				body: { message: 'Unauthorized' },
			} as BasicResponse);

		const userId = (await params).id;

		const res = await userRepo.delete(userId);

		return NextResponse.json({
			status: res ? 200 : 500,
			body: { message: res ? 'Success' : 'Failed' },
		} as BasicResponse);

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return NextResponse.json({
			status: 500,
			body: { message: 'Failed to delete note' },
		} as BasicResponse);
	}
}
