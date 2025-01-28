import { useMemo } from 'react';
import type { Note as NoteType } from '@/entities/Note';

interface GroupedNotesMapValue {
	nickname: string;
	notes: NoteType[];
}

export const useGroupedNotes = (notes: NoteType[]) => {
	return useMemo(() => {
		return notes.reduce<Map<string, GroupedNotesMapValue>>((acc, note) => {
			const {
				user: { id, nickname },
			} = note;

			if (!acc.has(id)) {
				acc.set(id, {
					nickname: '',
					notes: [],
				});
			}

			const group = acc.get(id)!;
			group.nickname = nickname;
			group.notes.push(note);
			return acc;
		}, new Map<string, GroupedNotesMapValue>());
	}, [notes]);
};
