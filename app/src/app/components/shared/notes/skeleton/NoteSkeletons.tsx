import { Skeleton } from '@nextui-org/react';
import { getRandomPastelColor } from '@/utils/_colors';

const NoteSkeleton = () => {
	const color = getRandomPastelColor();

	return (
		<div
			className={`relative w-64 h-64 rounded-lg p-6 shadow-lg snap-start scroll-ml-4 shrink-0 first:pl-4 last:pr-4 ${color}`}
		>
			<div className="flex justify-between items-start">
				<div className="space-y-4 w-full">
					<Skeleton className="w-3/4 h-6 rounded-lg bg-black/10" />
					<Skeleton className="w-full h-24 rounded-lg bg-black/10" />
				</div>
				<Skeleton className="w-8 h-8 rounded-full bg-black/10" />
			</div>
			<div className="absolute bottom-6 left-6">
				<Skeleton className="w-24 h-4 rounded-lg bg-black/10" />
			</div>
		</div>
	);
};

const NoteSkeletonGrid = () => {
	const skeletonsPattern = [[1, 2], [1]];

	return (
		<div className="flex gap-4 overflow-x-auto pb-4">
			{skeletonsPattern.map((pair, columnIndex) => (
				<div key={columnIndex} className="flex flex-col gap-4 w- 64">
					{pair.map((index) => (
						<NoteSkeleton key={index} />
					))}
				</div>
			))}
		</div>
	);
};

export default NoteSkeletonGrid;
