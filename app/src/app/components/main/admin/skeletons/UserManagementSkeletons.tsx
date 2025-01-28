import { Skeleton } from '@nextui-org/react';

export const LoadingSkeleton = () => (
	<div className="p-6 w-full md:w-auto md:max-w-7xl mx-auto">
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
							<Skeleton className="h-6 w-16 md:w-32 mb-2" />
							<Skeleton className="h-4 w-24 md:w-48" />
						</td>
						<td className="px-6 py-4">
							<Skeleton className="h-6 w-8 md:w-16" />
						</td>
						<td className="px-6 py-4">
							<Skeleton className="h-6 w-12 md:w-24" />
						</td>
						<td className="px-6 py-4">
							<Skeleton className="h-8 w-4 md:w-8 rounded-full" />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</>
);
