import React from 'react';
import { format, isSameMonth } from 'date-fns';
import { Note } from '@/entities/Note';

// CalendarHeader Component
interface CalendarHeaderProps {
	currentDate: Date;
	onPrevMonth: () => void;
	onNextMonth: () => void;
}

export const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth }: CalendarHeaderProps) => (
	<div className="flex justify-between items-center mb-4 sm:mb-6">
		<h2 className="text-lg sm:text-2xl font-semibold">{format(currentDate, 'MMMM yyyy')}</h2>
		<div className="flex gap-1 sm:gap-2">
			<button
				onClick={onPrevMonth}
				className="p-1 sm:p-2 text-sm sm:text-base rounded-lg bg-emerald-100 hover:bg-emerald-200"
			>
				Previous
			</button>
			<button
				onClick={onNextMonth}
				className="p-1 sm:p-2 text-sm sm:text-base rounded-lg bg-emerald-100 hover:bg-emerald-200"
			>
				Next
			</button>
		</div>
	</div>
);

// WeekDays Component
interface WeekDaysProps {
	daysShortNames: string[];
}

export const WeekDays = ({ daysShortNames }: WeekDaysProps) => (
	<div className="grid grid-cols-7 gap-1 sm:gap-4 mb-1 sm:mb-2">
		{daysShortNames.map((day) => (
			<div key={day} className="text-center text-xs sm:text-base font-medium text-gray-600">
				{day}
			</div>
		))}
	</div>
);

// DayCell Component
interface DayCellProps {
	day: Date;
	currentDate: Date;
	note?: Note;
}

export const DayCell = ({ day, currentDate, note }: DayCellProps) => {
	return (
		<div
			className={`relative min-h-16 sm:min-h-24 p-1 sm:p-2 rounded-lg border ${
				isSameMonth(day, currentDate) ? 'bg-white' : 'bg-neutral-100'
			} ${isSameMonth(day, currentDate) ? 'hover:bg-emerald-50' : 'hover:bg-neutral-200'}`}
		>
			<div className="flex flex-col h-full">
				<span className="text-xs sm:text-sm font-medium">{format(day, 'd')}</span>
			</div>

			{note && (
				<div className={`absolute top-1/3 left-0 mt-1 w-full rounded p-1 ${note.color} hover:bg-emerald-400 cursor-pointer`}>
					<span className="text-xs sm:text-sm font-medium block truncate">{note.title}</span>
				</div>
			)}
		</div>
	);
};
