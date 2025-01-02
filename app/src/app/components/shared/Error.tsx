'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({ error, title }: { error: Error & { digest?: string }; title: string; }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<div className="rounded-lg bg-red-50 p-8 text-center">
				<h2 className="mb-4 text-2xl font-bold text-red-800">{title}</h2>
				<p className="mb-4 text-red-600">{error.message}</p>
			</div>
		</div>
	);
}
