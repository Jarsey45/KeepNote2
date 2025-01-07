'use client';

import { Plus } from 'lucide-react';
import NoteForm, { FormData } from '@/app/components/shared/NoteForm';
import { useState } from 'react';
import { getUserSession } from '@/utils/_auth';

const FloatingActionButton = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);

	const handleAction = async (data: FormData) => {
		const response = await fetch('/api/notes', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		const json = await response.json();

		// await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate API call
		console.log('New note:', json);
	};

	return (
		<>
			<button
				onClick={() => setIsFormOpen(true)}
				className="fixed bottom-6 right-6 w-16 h-16 bg-green-100 rounded-full shadow-lg flex items-center justify-center hover:bg-green-50 transition-colors duration-200"
				aria-label="Add new item"
			>
				<Plus className="w-8 h-8 text-gray-600" />
			</button>

			<NoteForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleAction} />
		</>
	);
};

export default FloatingActionButton;
