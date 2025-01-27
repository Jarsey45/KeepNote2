import type { Note as NoteType } from '@/entities/Note';
import { NotesGrid } from '@/app/components/shared/notes/NoteGrid';
import { RefObject } from 'react';
import { useGroupedNotes } from '@/hooks/useGroupNotes';

interface NotesSharedGroupsProps {
	notes: NoteType[];
	loaderRef: RefObject<HTMLDivElement | null>;
	isLoading: boolean;
	hasMore: boolean;
}

export const NotesSharedGroups = ({ notes, loaderRef, isLoading, hasMore }: NotesSharedGroupsProps) => {
	const groupedNotes = useGroupedNotes(notes);
	console.log(Array.from(groupedNotes.entries()));

	return (
		<>
			{Array.from(groupedNotes.entries()).map(([userId, passedNotes]) => {
				console.log(userId, passedNotes);
				return (
					<div key={userId} className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-700">{userId}</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							<NotesGrid notes={passedNotes} loaderRef={loaderRef} isLoading={isLoading} hasMore={hasMore} />
						</div>
					</div>
				);
			})}

			<div className="space-y-4">
				<h3 className="text-lg font-semibold text-gray-700">{'userId'}</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<NotesGrid notes={notes} loaderRef={loaderRef} isLoading={isLoading} hasMore={hasMore} />
				</div>
			</div>
		</>
	);
};
