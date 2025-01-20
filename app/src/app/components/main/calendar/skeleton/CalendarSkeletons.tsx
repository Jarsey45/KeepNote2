import React from 'react';
import { Skeleton } from '@nextui-org/react';

export const CalendarHeaderSkeleton = () => (
	<div className="flex justify-between items-center mb-4 sm:mb-6">
		<Skeleton className="h-4 sm:h-8 w-40 rounded" />
		<div className="flex gap-1 sm:gap-2">
			<Skeleton className="h-6 sm:h-10 w-20 rounded" />
			<Skeleton className="h-6 sm:h-10 w-20 rounded" />
		</div>
	</div>
);

export const WeekDaysSkeleton = () => (
	<div className="grid grid-cols-7 gap-1 sm:gap-4 mb-1 sm:mb-2">
		{Array(7)
			.fill(null)
			.map((_, index) => (
				<Skeleton key={index} className="h-3 sm:h-6 rounded" />
			))}
	</div>
);

export const DayCellSkeleton = () => (
	<div className="min-h-16 sm:min-h-24 p-1 sm:p-2 border-2 rounded">
		<Skeleton className="h-3 sm:h-6 w-6 rounded mb-1 sm:mb-2" />
		<Skeleton className="h-10 sm:h-16 w-full rounded" />
	</div>
);

export const CalendarGridSkeleton = () => (
	<div className="grid grid-cols-7 gap-4">
		{Array(35)
			.fill(null)
			.map((_, index) => (
				<DayCellSkeleton key={index} />
			))}
	</div>
);

export const CalendarSkeleton = () => (
	<div className="w-full px-1 sm:px-4">
		<div className="bg-white rounded-lg shadow-lg p-2 sm:p-6">
			<CalendarHeaderSkeleton />
			<WeekDaysSkeleton />
			<CalendarGridSkeleton />
		</div>
	</div>
);

export default CalendarSkeleton;
