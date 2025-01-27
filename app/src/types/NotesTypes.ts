import type { Note as NoteType } from '@/entities/Note';

export interface NotesResponse {
	data: NoteType[];
	meta: {
		total: number;
		page: number;
		limit: number;
	};
}

export interface FetchState {
	page: number;
	hasMore: boolean;
	loading: boolean;
}

export interface SharedNotesProps {
  notes: NoteType[];
}
