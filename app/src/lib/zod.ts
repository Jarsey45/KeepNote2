import { z } from 'zod';

export const signInSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters')
		.max(32, 'Password must be less than 32 characters'),
});
