import { UserRepository } from '@/repositories/UserRepository';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { initDB } from '@/lib/db';
import { BasicResponse } from '@/types/NextResponse';

export async function POST(request: NextRequest) {
	console.log('test');
	try {
		await initDB();
		const { email, password, confirmPassword } = await request.json();

		const userRepository = new UserRepository();

		// It is checked in zod schema, but to be sure
		if (password !== confirmPassword)
			return NextResponse.json({
				status: 400,
				body: { message: 'Passwords do not match' },
			} as BasicResponse);

		const existingUser = await userRepository.findByEmail(email);

		if (existingUser)
			return NextResponse.json({
				status: 400,
				body: { message: 'Email already exists' },
			} as BasicResponse);

		const hashedPassword = await bcrypt.hash(password, 10);

		// insert user to db
		await userRepository.insert({
			email,
			password: hashedPassword,
			role: 'default',
		});

		return NextResponse.json({
			status: 200,
			body: { message: 'Successfuly registered' },
		} as BasicResponse);
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			status: 500,
			body: { message: 'Registration failed' },
		} as BasicResponse);
	}
}
