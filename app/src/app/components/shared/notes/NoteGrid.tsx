import type { Note as NoteType } from '@/entities/Note';
import { NotesColumn } from '@/app/components/shared/notes/NoteColumn';
import NoteSkeletonGrid from '@/app/components/shared/notes/skeleton/NoteSkeletons';
import { RefObject } from 'react';

interface NotesGridProps {
	notes: NoteType[];
	loaderRef?: RefObject<HTMLDivElement | null>; // optional
	isLoading: boolean;
	hasMore: boolean;
}

export const NotesGrid = ({ notes, loaderRef, isLoading, hasMore }: NotesGridProps) => {
	const getNotePairs = () => {
		const pairs = [];
		for (let i = 0; i < notes.length; i += 2) {
			pairs.push(notes.slice(i, Math.min(i + 2, notes.length)));
		}
		return pairs;
	};

	return (
		<div className="inline-flex gap-4 pb-4">
			{getNotePairs().map((pair, columnIndex) => (
				<NotesColumn key={columnIndex} notes={pair} />
			))}
			{hasMore && (
				<div ref={loaderRef} className="flex items-center justify-center">
					{isLoading && <NoteSkeletonGrid />}
				</div>
			)}
		</div>
	);
};
