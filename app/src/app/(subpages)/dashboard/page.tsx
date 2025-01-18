'use client';

import Note from '@/app/components/shared/Note';
import NoteSkeletonGrid from '@/app/components/shared/skeleton/NoteSkeletons';
import type { Note as NoteType } from '@/entities/Note';
import { BasicResponse } from '@/types/NextResponse';
import { eventEmitter } from '@/utils/_emitter';
import { useEffect, useRef, useState, WheelEvent } from 'react';

interface NotesResponse {
	data: NoteType[];
	meta: {
		total: number;
		page: number;
		limit: number;
	};
}

export default function Page() {
	const [notes, setNotes] = useState<NoteType[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);
	const loaderRef = useRef(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const fetchNotes = async () => {
		if (loading || !hasMore) return;
		setLoading(true);

		try {
			const response = await fetch(`/api/notes?page=${page}&limit=4`, {
				method: 'GET',
			});

			if (!response.ok) {
				const errorData : BasicResponse = await response.json();
				throw new Error(`Failed to fetch notes [${errorData.body.message}]`);
			}

			const { data, meta }: NotesResponse = await response.json();

			console.log(`Received ${data.length} notes`);
			// added throttling for testing //TODO: REMOVE
			await new Promise((resolve) => setTimeout(resolve, 1000));

			setNotes((prev) => [...prev, ...data]);
			setHasMore(meta.total > notes.length + data.length);
			setPage((prev) => prev + 1);
		} catch (error) {
			console.error('Error fetching notes:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => { //TODO maybe refetch all when changing anything, react will handle resolution by key
		const addNoteCB = () => {
			console.log('New note is available via EventEmitter. Fetching...');
			setHasMore(true);
			fetchNotes();
		};
		eventEmitter.on('newNote', addNoteCB);

		const deleteNoteCB = () => {
			console.log('Some note deleted. Revalidating notes...');
		};
		eventEmitter.on('deleteNote', deleteNoteCB);

		return () => {
			eventEmitter.off('newNote', addNoteCB);
			eventEmitter.off('deleteNote', deleteNoteCB);
		};
	}, []);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleWheel = (e: WheelEvent) => {
			const delta = Math.abs(e.deltaY);
			if (delta) {
				e.preventDefault();
				container.scrollTo({
					left: container.scrollLeft + e.deltaY * 2,
					behavior: 'auto',
				});
			}
		};

		container.addEventListener('wheel', handleWheel as unknown as EventListener, { passive: false });
		return () => container.removeEventListener('wheel', handleWheel as unknown as EventListener);
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					console.log('Intersection detected, fetching notes');
					fetchNotes();
				}
			},
			{ threshold: 0.1 }
		);

		if (loaderRef.current) {
			observer.observe(loaderRef.current);
		}

		return () => observer.disconnect();
	}, [page]);

	const getNotePairs = () => {
		const pairs = [];
		for (let i = 0; i < notes.length; i += 2) {
			pairs.push(notes.slice(i, Math.min(i + 2, notes.length)));
		}
		return pairs;
	};

	return (
		<div ref={containerRef} className="w-full overflow-x-auto snap-x snap-mandatory p-4">
			<div className="inline-flex gap-4 pb-4">
				{getNotePairs().map((pair, columnIndex) => (
					<div key={columnIndex} className="flex flex-col gap-4 w- 64">
						{pair.map((note) => (
							<Note
								key={note.id}
								id={note.id}
								title={note.title}
								content={note.content}
								date={new Date(note.createdAt)
									.toLocaleDateString('en-US', {
										month: '2-digit',
										day: '2-digit',
										year: 'numeric',
									})
									.replace(/\//g, '-')}
								color={note.color}
							/>
						))}
					</div>
				))}
				{hasMore && (
					<div ref={loaderRef} className="flex items-center justify-center">
						{loading && <NoteSkeletonGrid />}
					</div>
				)}
			</div>
		</div>
	);
}
