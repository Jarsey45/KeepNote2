import { getRandomPastelColor, isValidNoteColor, NoteColor } from '@/utils/_colors';

describe('Color Utilities', () => {
	describe('getRandomPastelColor', () => {
		it('returns a valid note color', () => {
			const color = getRandomPastelColor();
			expect(Object.values(NoteColor)).toContain(color);
		});
	});

	describe('isValidNoteColor', () => {
		it('returns true for valid colors', () => {
			expect(isValidNoteColor('bg-pink-200')).toBeTruthy();
		});

		it('returns false for invalid colors', () => {
			expect(isValidNoteColor('invalid-color')).toBeFalsy();
		});
	});
});
