import NoteSkeletonGrid from '@/app/components/shared/notes/skeleton/NoteSkeletons';

const NoteGroupSkeleton = () => {
	return (
		<div className="inline-flex flex-nowrap gap-4 relative">
			{[1, 2].map((group) => (
				<div key={group} className="flex-none snap-start">
					<div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
					<div className="grid grid-cols-1 gap-4">
						<NoteSkeletonGrid key={group} />
					</div>
				</div>
			))}
		</div>
	);
};

export default NoteGroupSkeleton;
