import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.scss';

export const metadata: Metadata = {
	title: 'KeepNote - Your Personal Note Taking App',
	description: 'A modern note-taking application for organizing your thoughts',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="light">
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
