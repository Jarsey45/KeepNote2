import { AuthCard } from '@/app/components/auth/AuthCard';
import { AuthInput } from '@/app/components/auth/AuthInput';
import { AuthButton } from '@/app/components/auth/AuthButton';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { FC } from 'react';
import { isRedirectError } from 'next/dist/client/components/redirect';

interface AuthProps {
	error?: string;
}

const LoginPage: FC<AuthProps> = (searchParams) => {
	async function authenticate(formData: FormData) {
		'use server';

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		try {
			const result = await signIn('credentials', {
				email,
				password,
				redirect: false,
			});

			console.log(`RESULT: ${result}`);

			if (!result?.error) {
				redirect('/dashboard');
			}

			// redirect(`/login?error=${result.error}`);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			if(isRedirectError(error)) throw error;
			console.log(`ERROR: ${error}`);
			// redirect('/login?error=UnknownError');
		}
	}

	return (
		<AuthCard>
			<form className="mt-8 space-y-6" action={authenticate}>
				{searchParams?.error && (
					<div className="rounded-md bg-red-50 p-4 text-sm text-red-500">
						{searchParams.error === 'CredentialsSignin' ? 'Invalid email or password' : 'Failed to sign in'}
					</div>
				)}
				<AuthInput name="email" type="email" placeholder="Email"></AuthInput>
				<AuthInput name="password" type="password" placeholder="Password"></AuthInput>
				<AuthButton content="Login"></AuthButton>
			</form>
			<div className="text-center">
				No account yet?{' '}
				<a href="/register" className="text-emerald-500">
					Register!
				</a>
			</div>
		</AuthCard>
	);
};

export default LoginPage;
