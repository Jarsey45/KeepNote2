'use client';

import { LoadingSkeleton } from '@/app/components/main/admin/skeletons/UserManagementSkeletons';
import { UserTable } from '@/app/components/main/admin/user-table/UserTable';
import { useAdmin } from '@/app/context/AdminContext';
import { User } from '@/entities/User';
import { BasicResponse } from '@/types/NextResponse';
import { Alert } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminPage() {
	const adminContext = useAdmin();
	const router = useRouter();
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if(!adminContext.isAdmin)
			router.push('/dashboard');

		fetchUsers();
	}, []);


	const fetchUsers = async () => {
		try {
			const response = await fetch('/api/users');
			if (!response.ok) {
				const {
					body: { message },
				}: BasicResponse = await response.json();
				throw new Error(message);
			}

			const {body: { data }}: BasicResponse = await response.json();
			setUsers(data as User[]);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to fetch users');
		} finally {
			setLoading(false);
		}
	};

	const deleteUser = async (userId: string) => {
		try {
			const response = await fetch(`/api/users/${userId}`, {
				method: 'DELETE',
			});
			if (!response.ok) throw new Error('Failed to delete user');
			setUsers(users.filter((user) => user.id !== userId));
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to delete user');
		}
	};

	if (loading) {
		return <LoadingSkeleton />;
	}

	return (
		<div className="p-6 w-full md:w-auto md:max-w-7xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">User Management</h1>
			{error && <Alert color="danger" className="mb-4 bg-red-50" title={error} />}
			<UserTable users={users} loading={loading} onDelete={deleteUser} />
		</div>
	);
}
