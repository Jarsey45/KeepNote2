import type { Note as NoteType } from '@/entities/Note';
import { NotesGrid } from '@/app/components/shared/notes/NoteGrid';
import { RefObject } from 'react';
import { useGroupedNotes } from '@/hooks/useGroupedNotes';
import NoteGroupSkeleton from './skeleton/NoteGroupSkeletons';

interface NotesSharedGroupsProps {
	notes: NoteType[];
	loaderRef: RefObject<HTMLDivElement | null>;
	isLoading: boolean;
	hasMore: boolean;
}

export const NotesSharedGroups = ({ notes, loaderRef, isLoading, hasMore }: NotesSharedGroupsProps) => {
	const groupedNotes = useGroupedNotes(notes);

	return (
		<div className="inline-flex flex-nowrap gap-4 relative">
			{Array.from(groupedNotes.entries()).map(([userId, data]) => (
				<div key={userId} className="flex-none snap-start">
					<h3 className="text-lg font-semibold text-gray-700 mb-4">{data.nickname}</h3>
					<div className="grid grid-cols-1 gap-4">
						<NotesGrid notes={data.notes} isLoading={isLoading} hasMore={hasMore} isShared={true} />
					</div>
				</div>
			))}

			{hasMore && <div ref={loaderRef} className="flex-none w-20 h-full absolute right-0" />}

			{hasMore && (
				<div ref={loaderRef} className="flex items-center justify-center">
					{isLoading && <NoteGroupSkeleton />}
				</div>
			)}
		</div>
	);
};
