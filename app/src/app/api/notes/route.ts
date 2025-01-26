import { NextResponse } from 'next/server';
import { initDB } from '@/lib/db';
import { UserRepository } from '@/repositories/UserRepository';
import { NoteRepository } from '@/repositories/NoteRepository';
import { getRandomPastelColor } from '@/utils/_colors';
import { auth } from '@/auth';
import { z } from 'zod';
import { Note } from '@/entities/Note';
import { BasicResponse } from '@/types/NextResponse';

export async function POST(request: Request) {
	try {
		await initDB();

		const session = await auth();
		if (!session?.user?.email)
			return NextResponse.json({
				status: 401,
				body: { message: 'Unauthorized' },
			} as BasicResponse);

		const body = await request.json();

		// get user id
		const userRepo = new UserRepository();
		const user = await userRepo.findByEmail(session.user.email ?? '');
		if (!user)
			return NextResponse.json({
				status: 400,
				body: { message: 'User not found' },
			} as BasicResponse);

		const noteRepo = new NoteRepository();
		const note = await noteRepo.insert({
			title: body.title,
			content: body.content,
			color: getRandomPastelColor(),
			user,
		});

		if (!note)
			return NextResponse.json({
				status: 400,
				body: { message: 'Could not create note' },
			} as BasicResponse);

		return NextResponse.json(note);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			status: 500,
			body: { message: 'Failed to create new note' },
		} as BasicResponse);
	}
}

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
		const user = await userRepo.findByEmail(session?.user?.email ?? '');

		if (!user)
			return NextResponse.json({
				status: 400,
				body: { message: 'User not found' },
			} as BasicResponse);

		const noteRepo = new NoteRepository();
		const { notes, total } = await noteRepo.findByUserWithPagination(user, { page, limit });

		const validatedNotes = NotesResponseSchema.parse(notes);
		return NextResponse.json(
			{
				data: validatedNotes,
				meta: {
					total,
					page,
					limit,
				},
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.error();
	}
}
