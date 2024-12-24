'use client';

import { z } from 'zod';
import { AuthCard } from '@/app/components/auth/AuthCard';
import { AuthInput } from "@/app/components/auth/AuthInput";
import { AuthButton } from '@/app/components/auth/AuthButton';

const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
	return (
		<AuthCard>
			<form className="mt-8 space-y-6">
				<AuthInput type="email" placeholder="Email"></AuthInput>
				<AuthInput type="password" placeholder="Password"></AuthInput>
				<AuthButton content="Login"></AuthButton>
			</form>
			<div className='text-center'>
				No account yet? <a href="/register" className="text-emerald-500">Register!</a>
			</div>
		</AuthCard>
	);
}
