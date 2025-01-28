import { Skeleton } from '@nextui-org/react';

export const LoadingSkeleton = () => (
	<div className="p-6 max-w-7xl mx-auto">
		<Skeleton className="h-10 w-48 mb-6" />
		<div className="bg-white rounded-lg shadow p-6">
			<div className="space-y-4">
				<LoadingRows />
			</div>
		</div>
	</div>
);

export const LoadingRows = () => (
	<>
		<table>
			<tbody>
				{[1, 2, 3].map((i) => (
					<tr key={i}>
						<td className="px-6 py-4">
							<Skeleton className="h-6 w-32 mb-2" />
							<Skeleton className="h-4 w-48" />
						</td>
						<td className="px-6 py-4">
							<Skeleton className="h-6 w-16" />
						</td>
						<td className="px-6 py-4">
							<Skeleton className="h-6 w-24" />
						</td>
						<td className="px-6 py-4">
							<Skeleton className="h-8 w-8 rounded-full" />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</>
);
