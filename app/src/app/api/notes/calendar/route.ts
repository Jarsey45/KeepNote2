import { auth } from '@/auth';
import { initDB } from '@/lib/db';
import { NoteRepository } from '@/repositories/NoteRepository';
import { UserRepository } from '@/repositories/UserRepository';
import { BasicResponse } from '@/types/NextResponse';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		await initDB();

		const session = await auth();
		if (!session?.user?.email)
			return NextResponse.json({
				status: 401,
				body: { message: 'Unauthorized' },
			} as BasicResponse);

		// get user id
		const userRepo = new UserRepository();
		const user = await userRepo.findByEmail(session.user.email ?? '');
		if (!user)
			return NextResponse.json({
				status: 400,
				body: { message: 'User not found' },
			} as BasicResponse);

		const { searchParams } = new URL(request.url);
		const startDateParam = searchParams.get('startDate');
		const startDate = startDateParam ? new Date(startDateParam) : null;

		const endDateParam = searchParams.get('endDate');
		const endDate = endDateParam ? new Date(endDateParam) : null;

		if (startDate === null || endDate === null)
			return NextResponse.json({
				status: 400,
				body: { message: 'Invalid date range' },
			} as BasicResponse);


		const noteRepo = new NoteRepository();
		const notes = await noteRepo.findBetweenDates(startDate, endDate);


		if (!notes || notes.length < 1) throw new Error('Failed to fetch notes between dates');

		return NextResponse.json({
			status: 200,
			body: {
				message: 'Successfully fetched notes',
				data: notes,
			 },
		} as BasicResponse);

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			status: 500,
			body: { message: 'Failed to fetch notes between dates' },
		} as BasicResponse);
	}
}
