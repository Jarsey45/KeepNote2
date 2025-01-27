import type { Note as NoteType } from '@/entities/Note';
import Note from '@/app/components/shared/notes/Note';

interface NotesColumnProps {
	notes: NoteType[];
}

export const NotesColumn = ({ notes }: NotesColumnProps) => (
	<div className="flex flex-col gap-4 w-64">
		{notes.map((note) => (
			<Note
				key={note.id}
				id={note.id}
				title={note.title}
				content={note.content}
				date={new Date(note.createdAt)
					.toLocaleDateString('en-US', {
						day: 'numeric',
						month: 'short',
						year: 'numeric',
					})
					.replace(/\//g, '-')}
				color={note.color}
			/>
		))}
	</div>
);
