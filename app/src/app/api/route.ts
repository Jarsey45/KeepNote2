import { NextResponse } from 'next/server';

export async function GET() {
	return NextResponse.json({ message: 'Hello from Next.js!' });
}

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Returns a welcome message
 *     tags: [Default]
 *     description: A simple endpoint to test the API.
 *     responses:
 *       200:
 *         description: A welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello from Next.js!
 */
