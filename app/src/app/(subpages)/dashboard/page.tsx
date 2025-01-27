'use client';

import { useRef, useEffect } from 'react';
import { eventEmitter } from '@/utils/_emitter';
import { useNotesFetch } from '@/hooks/useNotesFetch';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import { NotesGrid } from '@/app/components/shared/notes/NoteGrid';

export default function DashboardPage() {
	const { notes, fetchState, fetchNotes, revalidateNotes } = useNotesFetch();
	const containerRef = useRef<HTMLDivElement>(null);
	const loaderRef = useRef(null);

	useHorizontalScroll(containerRef);

	useEffect(() => {
		if (!loaderRef.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					fetchNotes();
				}
			},
			{ threshold: 0.1 }
		);

		observer.observe(loaderRef.current);
		return () => observer.disconnect();
	}, [fetchNotes]);

	useEffect(() => {
		const events = ['newNote', 'deleteNote', 'updateNote'];
		events.forEach((event) => {
			eventEmitter.on(event, revalidateNotes);
		});

		return () => {
			events.forEach((event) => {
				eventEmitter.off(event, revalidateNotes);
			});
		};
	}, []);

	return (
		<div ref={containerRef} className="w-full overflow-x-auto snap-x snap-mandatory p-4">
			<NotesGrid notes={notes} loaderRef={loaderRef} isLoading={fetchState.loading} hasMore={fetchState.hasMore} />
		</div>
	);
}
