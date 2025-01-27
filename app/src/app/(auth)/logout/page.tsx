'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function LogoutPage() {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await signOut({ redirect: true, callbackUrl: '/login' });
		} catch (error) {
			console.error('Logout error:', error);
			router.push('/login');
		}
	};

	handleLogout();

	return <div>Logging out...</div>;
}
