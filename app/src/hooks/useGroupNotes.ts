import { useMemo } from 'react';
import type { Note as NoteType } from '@/entities/Note';

export const useGroupedNotes = (notes: NoteType[]) => {
	return useMemo(() => {
		return notes.reduce<Map<string, NoteType[]>>((acc, note) => {
			const {
				user: { id },
			} = note;

			if (!acc.has(id)) {
				acc.set(id, []);
			}

			acc.get(id)?.push(note);
			return acc;
		}, new Map<string, NoteType[]>());
	}, [notes]);
};
