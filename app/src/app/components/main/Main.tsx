export default async function Main({ children }: { children: React.ReactNode }) {
	return (
		<main className="flex flex-1 items-center">
			{children}
		</main>
	);
}
