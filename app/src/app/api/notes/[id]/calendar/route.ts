import { auth } from '@/auth';
import { initDB } from '@/lib/db';
import { NoteRepository } from '@/repositories/NoteRepository';
import { UserRepository } from '@/repositories/UserRepository';
import { BasicResponse } from '@/types/NextResponse';
import { NextResponse } from 'next/server';

interface SlugIDParams {
	params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: SlugIDParams) {
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

		const noteId = (await params).id;

		const body = await request.json();
		const dateCalendar = body.date;

		const noteRepo = new NoteRepository();
		const updatedNote = await noteRepo.addToCalendar(noteId, dateCalendar);

		if(!updatedNote) throw new Error('Failed to add note to calendar');

		return NextResponse.json({
			status: 200,
			body: { message: 'Successfully added note to calendar' },
		} as BasicResponse);

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			status: 500,
			body: { message: 'Failed to add note to calendar' },
		} as BasicResponse);
	}
}

/**
 * @swagger
 * /api/notes/{id}/calendar:
 *   post:
 *     summary: Add note to calendar
 *     tags: [Notes, Calendar]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Note added to calendar
 */
