import { NextResponse, } from "next/server";
import { initDB, } from "@/lib/db";
import { Note, } from "@/entities/Note";

export async function POST(request: Request) {
	const dataSource = await initDB();
	const body = await request.json();

	const note = dataSource.getRepository(Note).create(body);
	await dataSource.getRepository(Note).save(note);

	return NextResponse.json(note);
}
