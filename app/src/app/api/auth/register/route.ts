import { UserRepository } from '@/repositories/UserRepository';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { initDB } from '@/lib/db';
import { BasicResponse } from '@/types/NextResponse';

export async function POST(request: NextRequest) {
	try {
		await initDB();
		const { nickname, email, password, confirmPassword } = await request.json();

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
			nickname,
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

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - confirmPassword
 *               - nickname
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               confirmPassword:
 *                 type: string
 *                 minLength: 6
 *               nickname:
 *                 type: string
 *                 minLength: 3
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input or email already exists
 *       500:
 *         description: Server error
 */
