'use client';

import { Plus } from 'lucide-react';
import NoteForm, { FormData } from '@/app/components/shared/notes/options/NoteForm';
import { useState } from 'react';
import { eventEmitter } from '@/utils/_emitter';

const FloatingActionButton = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);

	const handleAction = async (data: FormData) => {
		const response = await fetch('/api/notes', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});
		await response.json();

		eventEmitter.emit('newNote');
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
