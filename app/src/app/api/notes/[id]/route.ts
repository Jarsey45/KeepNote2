import { auth } from '@/auth';
import { initDB } from '@/lib/db';
import { NoteRepository } from '@/repositories/NoteRepository';
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

		const noteId = (await params).id;

		const noteRepo = new NoteRepository();
		const note = await noteRepo.findByIdWithRelations(noteId);
		if (!note)
			return NextResponse.json({
				status: 400,
				body: { message: 'Note not found' },
			} as BasicResponse);

		//check if user is owner of note
		if (note.user.id !== user.id)
			return NextResponse.json({
				status: 403,
				body: { message: 'User does not own this note' },
			} as BasicResponse);

		const res = await noteRepo.delete(note.id);

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

export async function PUT(request: Request, { params }: SlugIDParams) {
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

		const noteId = (await params).id;

		const noteRepo = new NoteRepository();
		const note = await noteRepo.findByIdWithRelations(noteId);
		if (!note)
			return NextResponse.json({
				status: 400,
				body: { message: 'Note not found' },
			} as BasicResponse);

		//check if user is owner of note
		if (note.user.id !== user.id)
			return NextResponse.json({
				status: 403,
				body: { message: 'User does not own this note' },
			} as BasicResponse);

		const body = await request.json();
		if (!body.title || !body.content)
			return NextResponse.json({
				status: 400,
				body: { message: 'Title and content are required' },
			} as BasicResponse);

		const res = await noteRepo.update(note.id, {
			title: body.title,
			content: body.content,
		});

		return NextResponse.json({
			status: res ? 200 : 500,
			body: { message: res ? 'Success' : 'Failed' },
		} as BasicResponse);

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			status: 500,
			body: { message: 'Failed to update note' },
		} as BasicResponse);
	}
}

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete note
 *     tags: [Notes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *   put:
 *     summary: Update note
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
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated successfully
 */
