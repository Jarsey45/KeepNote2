import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
	title: z.string().min(1, 'Title is required'),
	content: z.string().min(1, 'Content is required'),
});

export type FormData = z.infer<typeof schema>;

interface NoteFormProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: FormData) => Promise<void>;
	initialData?: FormData; // Optional for creation, required for editing
	mode?: 'create' | 'edit';
}

const NoteForm = ({ isOpen, onClose, onSubmit, initialData, mode = 'create' }: NoteFormProps) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: initialData,
	});

	const handleFormSubmit = async (data: FormData) => {
		try {
			setIsSubmitting(true);
			await onSubmit(data);
			reset();
			onClose();
		} catch (error) {
			console.error(`Failed to ${mode} note:`, error);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!isOpen) return null;

	const isEditMode = mode === 'edit';

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-md relative">
				<button
					onClick={onClose}
					disabled={isSubmitting}
					className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 disabled:opacity-50"
				>
					<X className="w-5 h-5" />
				</button>

				<h2 className="text-xl font-semibold mb-4">{isEditMode ? 'Edit Note' : 'Create New Note'}</h2>

				<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
					<div>
						<input
							{...register('title')}
							placeholder="Note Title"
							disabled={isSubmitting}
							className="w-full p-2 border rounded focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
						/>
						{errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
					</div>

					<div>
						<textarea
							{...register('content')}
							placeholder="Note Content"
							rows={4}
							disabled={isSubmitting}
							className="w-full p-2 border rounded focus:ring-2 focus:ring-green-200 focus:outline-none disabled:opacity-50"
						/>
						{errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-green-100 text-gray-700 py-2 rounded hover:bg-green-200 transition-colors duration-200 disabled:opacity-50 flex items-center justify-center"
					>
						{isSubmitting ? (
							<>
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
								{isEditMode ? 'Updating Note...' : 'Creating Note...'}
							</>
						) : (
							isEditMode ? 'Update Note' : 'Create Note'
						)}
					</button>
				</form>
			</div>
		</div>
	);
};

export default NoteForm;
