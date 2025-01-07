import FloatingActionButton from '@/app/components/shared/FloatingActionButton';

export default async function Footer() {
	const handleAction = () => {
		console.log('ADD');
	}

	return (
		<footer className="flex-[0.15]">
			<FloatingActionButton />
		</footer>
	);
}
