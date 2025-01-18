import { auth } from '@/auth';
import { initDB } from '@/lib/db';
import { NoteRepository } from '@/repositories/NoteRepository';
import { UserRepository } from '@/repositories/UserRepository';
import { NextResponse } from 'next/server';

interface SlugIDParams {
	params: Promise<{ id: string }>;
}

export async function DELETE(request: Request, { params }: SlugIDParams) {
	try {
		await initDB();

		const session = await auth();
		if (!session?.user?.email)
			return NextResponse.json({
				status: 401,
				body: { message: 'Unauthorized' },
			});

		const userRepo = new UserRepository();
		const user = await userRepo.findByEmail(session.user.email ?? '');
		if (!user)
			return NextResponse.json({
				status: 400,
				body: { message: 'User not found' },
			});

		const noteId = (await params).id;

		const noteRepo = new NoteRepository();
		const note = await noteRepo.findByIdWithRelations(noteId);
		if (!note)
			return NextResponse.json({
				status: 400,
				body: { message: 'Note not found' },
			});

		//check if user is owner of note
		if (note.user.id !== user.id)
			return NextResponse.json({
				status: 403,
				body: { message: 'User does not own this note' },
			});

		const res = await noteRepo.delete(note.id);

		return NextResponse.json({
			status: res ? 200 : 500,
			body: { message: res ? 'Success' : 'Failed' },
		});

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return NextResponse.json({
			status: 500,
			body: { message: 'Failed to delete note' },
		});
	}
}

export async function PUT(request: Request, { params }: SlugIDParams) {
	const noteId = (await params).id;
	console.log('Note ID: %s', noteId);

	console.log(request);
}
