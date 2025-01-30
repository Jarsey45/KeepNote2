import { auth } from '@/auth';
import { Note } from '@/entities/Note';
import { initDB } from '@/lib/db';
import { NoteRepository } from '@/repositories/NoteRepository';
import { UserRepository } from '@/repositories/UserRepository';
import { BasicResponse, SharedNotesResponse } from '@/types/NextResponse';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const NotesResponseSchema = z.array(z.instanceof(Note));

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
		const page = parseInt(searchParams.get('page') ?? '1');
		const limit = parseInt(searchParams.get('limit') ?? '10');

		// get user id
		const userRepo = new UserRepository();
		const user = await userRepo.findByEmail(session.user.email);
		if (!user) {
			return NextResponse.json({
				status: 404,
				body: { message: 'User not found' },
			} as BasicResponse);
		}

		const noteRepo = new NoteRepository();
		const { notes, total } = await noteRepo.findSharedWithUserWithPagination(user, { page, limit });

		const validatedNotes = NotesResponseSchema.parse(notes);

		return NextResponse.json({
			status: 200,
			body: {
				message: 'Notes fetched successfully',
				data: validatedNotes,
				meta: {
					total,
					page,
					limit,
				},
			},
		} as SharedNotesResponse);
	} catch (error) {
		console.error(error);
		return NextResponse.error();
	}
}


/**
 * @swagger
 * /api/notes/shared-to:
 *   get:
 *     summary: Get notes shared with user
 *     tags: [Notes]
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of shared notes
 */
