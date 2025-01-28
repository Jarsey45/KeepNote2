import NextAuth, { AuthError } from 'next-auth';
import { TypeORMAdapter } from '@auth/typeorm-adapter';
import Credentials from 'next-auth/providers/credentials';
import { UserRepository } from '@/repositories/UserRepository';
import bcrypt from 'bcrypt';
import { AppDataSource, initDB } from '@/lib/db';
import { signInSchema } from '@/lib/zod';

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		Credentials({
			async authorize(credentials) {
				await initDB();
				const { email, password } = await signInSchema.parseAsync(credentials);

				const userRepository = new UserRepository();
				const user = await userRepository.findByEmail(email);

				if (!user) throw new AuthError('Email not found.');

				const passwordMatch = await bcrypt.compare(password, user.password);

				if (!passwordMatch) throw new AuthError('Invalid credentials.');
				return user;
			},
		}),
	],
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	adapter: TypeORMAdapter(AppDataSource.options) as any,
	session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
	pages: {
		signIn: '/login',
		signOut: '/logout',
		error: '/login',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
	},
});
