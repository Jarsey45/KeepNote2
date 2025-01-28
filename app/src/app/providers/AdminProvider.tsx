import { auth } from '@/auth';
import { AdminProvider } from '@/app/context/AdminContext';
import { UserRepository } from '@/repositories/UserRepository';
import { initDB } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function AdminProviderWrapper({ children }: { children: React.ReactNode }) {
	const session = await auth();
	let isAdmin = false;

	if(session?.user?.email) {
		await initDB();
		const userRepo = new UserRepository();
		const user = await userRepo.findByEmail(session?.user?.email ?? '');
		if (user === null) {
			redirect('/login');
		}
		isAdmin = user.role === 'admin';
	}

	return <AdminProvider initialIsAdmin={isAdmin}>{children}</AdminProvider>;
}
