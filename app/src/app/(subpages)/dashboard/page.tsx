'use client';

import Note from '@/app/components/shared/Note';
import type { Note as NoteType } from '@/entities/Note';
import { LucideLoader2 } from 'lucide-react';
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
			const response = await fetch(`/api/notes?page=${page}&limit=3`, {
				method: 'GET',
			});

			if (!response.ok) throw new Error('Failed to fetch notes');

			const { data, meta }: NotesResponse = await response.json();

			setNotes((prev) => [...prev, ...data]);
			setHasMore(meta.total > notes.length + data.length);
			setPage((prev) => prev + 1);
		} catch (error) {
			console.error('Error fetching notes:', error);
		} finally {
			setLoading(false);
		}
	};

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
					console.log('Intersection');
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

	return (
		<div ref={containerRef} className="w-full overflow-x-auto snap-x snap-mandatory p-4">
			<div className="inline-flex gap-4 pb-4">
				{notes.map((note, index) => (
					<Note
						key={note.id}
						title={note.title}
						content={note.content}
						date={note.createdAt.toString()}
						color={note.color}
					/>
				))}
				{hasMore && (
					<div ref={loaderRef} className="flex items-center justify-center">
						{loading ? <LucideLoader2 className="w-24 h-24 animate-spin" /> : <span>Load more...</span>}
					</div>
				)}
			</div>
		</div>
	);
}
