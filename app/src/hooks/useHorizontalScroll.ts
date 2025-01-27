import { useEffect, RefObject } from 'react';

export const useHorizontalScroll = (containerRef: RefObject<HTMLDivElement|null>) => {
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
	}, [containerRef]);
};
