export function debounce<T extends unknown[], R>(func: (...args: T) => R, wait: number): (...args: T) => void {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	return (...args: T) => {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			func(...args);
		}, wait);
	};
}
