import type { Note as NoteType } from '@/entities/Note';

export interface BasicResponse {
	status: number;
	body: {
		message: string;
		data?: unknown;
	};
}

export interface SharedNotesResponse {
	status: number;
	body: {
		message: string;
		data: NoteType[];
		meta: {
			total: number;
			page: number;
			limit: number;
		};
	};
}
