'use client';

import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthCard } from '@/app/components/auth/AuthCard';
import { AuthInput } from '@/app/components/auth/AuthInput';
import { AuthButton } from '@/app/components/auth/AuthButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/compat/router';

const registerSchema = z
	.object({
		email: z.string().email('Invalid email address'),
		password: z.string().min(6, 'Password must be at least 6 characters'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterForm>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
		setIsLoading(true);

		try {
			const response = await fetch('http://localhost:3000/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			if(!response.ok) {
				const error = await response.json();
				throw new Error(error.message || 'Registration failed');
			}

			if(router)
				router.push('/login');
		} catch(error: unknown) {
			if(error instanceof Error) {
				// TODO: show toast
				alert(error.message);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthCard>
			<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
				<AuthInput
					type="email"
					placeholder="Email"
					error={errors.email}
					disabled={isLoading}
					{...register('email')}
				></AuthInput>
				<AuthInput
					type="password"
					placeholder="Password"
					error={errors.password}
					disabled={isLoading}
					{...register('password')}
				></AuthInput>
				<AuthInput
					type="password"
					placeholder="Confirm password"
					error={errors.confirmPassword}
					disabled={isLoading}
					{...register('confirmPassword')}
				></AuthInput>
				<AuthButton content="Register"></AuthButton>
			</form>
			<div className="text-center text-sm">
				Already have an account?{' '}
				<Link href="/login" className="text-emerald-500">
					Log in!
				</Link>
			</div>
		</AuthCard>
	);
}
