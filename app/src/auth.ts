import NextAuth from "next-auth"
import { TypeORMAdapter } from "@auth/typeorm-adapter"
import Credentials from 'next-auth/providers/credentials';
import { UserRepository } from '@/repositories/UserRepository';
import { User as AuthUser } from 'next-auth';
import bcrypt from 'bcrypt';
import { AppDataSource } from './lib/db';

if (!process.env.AUTH_TYPEORM_CONNECTION) {
  throw new Error("AUTH_TYPEORM_CONNECTION environment variable is not defined")
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
		Credentials({
			async authorize(credentials) {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};

				const userRepository = new UserRepository();
				const user = await userRepository.findByEmail(email);

				if(!user) return null;

				const passwordMatch = await bcrypt.compare(password, user.password);

				if(!passwordMatch) return null;
				return user;
			}
		}),
	],
  adapter: TypeORMAdapter(AppDataSource.options),
	session: { strategy: 'jwt' },
	pages: {
		signIn: '/login',
	}
});
