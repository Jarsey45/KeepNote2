import { useState, useCallback } from 'react';
import type { Note as NoteType } from '@/entities/Note';
import { BasicResponse, SharedNotesResponse } from '@/types/NextResponse';
import { FetchState } from '@/types/NotesTypes';

export const useSharedNotesFetch = () => {
	const [notes, setNotes] = useState<NoteType[]>([]);
	const [fetchState, setFetchState] = useState<FetchState>({
		page: 1,
		hasMore: true,
		loading: false,
	});

	const fetchNotes = useCallback(async () => {
		const { loading, hasMore, page } = fetchState;
		if (loading || !hasMore) return;

		setFetchState((prev) => ({ ...prev, loading: true }));

		try {
			const response = await fetch(`/api/notes/shared-to?page=${page}&limit=4`);

			if (!response.ok) {
				const errorData: BasicResponse = await response.json();
				throw new Error(`Failed to fetch notes [${errorData.body.message}]`);
			}

			const {
				status,
				body: { message, data, meta },
			}: SharedNotesResponse = await response.json();

			if (status !== 200) {
				throw new Error(`Failed to fetch notes [${message}]`);
			}

			setNotes((prev) => [...prev, ...data]);
			setFetchState((prev) => ({
				page: prev.page + 1,
				hasMore: meta.total > prev.page * meta.limit,
				loading: false,
			}));
		} catch (error) {
			console.error('Error fetching notes:', error);
			setFetchState((prev) => ({ ...prev, loading: false }));
		}
	}, [fetchState]);

	const revalidateNotes = () => {
		setFetchState((prev) => ({ ...prev, hasMore: true, page: 1 }));
		setNotes([]);
	};

	return { notes, fetchState, fetchNotes, revalidateNotes };
};
