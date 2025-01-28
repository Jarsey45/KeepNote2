import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
	message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	res.status(200).json({ message: 'Hello from Next.js!' });
}

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Returns a welcome message
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
