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
		const noteRepo = new NoteRepository();
		const noteToShare = await noteRepo.findById(noteId);

		if (!noteToShare)
			return NextResponse.json({
				status: 400,
				body: { message: 'Could not find note to share' },
			} as BasicResponse);

		const body = await request.json();
		const userIds = body.userIds;

		for (const userId of userIds) {
			await userRepo.addSharedNote(userId, noteToShare);
		}

		return NextResponse.json({
			status: 200,
			body: { message: 'Successfully shared note' },
		} as BasicResponse);

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			status: 500,
			body: { message: 'Failed to share note' },
		} as BasicResponse);
	}
}

/**
 * @swagger
 * /api/notes/{id}/shared-with:
 *   post:
 *     summary: Share note with users
 *     tags: [Notes]
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
 *               - userIds
 *             properties:
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Note shared successfully
 */
