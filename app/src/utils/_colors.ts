export enum NoteColor {
	PASTEL_PINK = 'bg-pink-200',
	PASTEL_PURPLE = 'bg-purple-200',
	PASTEL_BLUE = 'bg-sky-200',
	PASTEL_GREEN = 'bg-green-200',
	PASTEL_YELLOW = 'bg-yellow-200',
	PASTEL_ORANGE = 'bg-orange-200',
	PASTEL_RED = 'bg-red-200',
	PASTEL_INDIGO = 'bg-indigo-200',
	PASTEL_TEAL = 'bg-teal-200',
	PASTEL_CYAN = 'bg-cyan-200',
}

// Helper function to get a random pastel color
export const getRandomPastelColor = (): NoteColor => {
	const colors = Object.values(NoteColor);
	const randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex];
};

// Type guard to check if a string is a valid NoteColor
export const isValidNoteColor = (color: string): color is NoteColor => {
	return Object.values(NoteColor).includes(color as NoteColor);
};
