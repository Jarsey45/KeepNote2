import NavBar from '@/app/components/main/NavBar';
import Main from '@/app/components/main/Main';
import Footer from '@/app/components/main/Footer';

export default async function SubpagesLayout({ children }: { children: React.ReactNode }) {

	return (
		<div className="container min-h-screen min-w-full bg-gray-50 flex flex-col">
			<NavBar />
			<Main> {children} </Main>
			<Footer />
		</div>
	);
}
