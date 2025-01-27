import NavBar from '@/app/components/main/NavBar';
import Main from '@/app/components/main/Main';
import Footer from '@/app/components/main/Footer';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function SubpagesLayout({ children }: { children: React.ReactNode }) {
	const session = await auth();

	if (!session?.user?.email) {
		redirect('/login');
	}

	return (
		<div className="container min-h-screen min-w-full bg-gray-50 flex flex-col">
			<NavBar />
			<Main> {children} </Main>
			<Footer />
		</div>
	);
}
