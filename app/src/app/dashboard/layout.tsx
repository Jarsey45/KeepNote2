import { Menu } from '@/app/components/main/menu/Menu';

export const metadata: Metadata = {
	title: 'KeepNote - Your Personal Note Taking App',
	description: 'A modern note-taking application for organizing your thoughts',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<section className="container min-h-screen min-w-full flex flex-col bg-gray-50">
			<header className="flex-1">
				<Menu />
			</header>
			<main className="flex-auto">{children} MAIN</main>
			<footer>
				Footer test
			</footer>
		</section>
	);
}
