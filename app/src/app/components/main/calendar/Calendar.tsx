'use client';

import { useCallback, useEffect, useState } from 'react';
import CalendarSkeleton from '@/app/components/main/calendar/skeleton/CalendarSkeletons';
import { eachDayOfInterval, endOfMonth, format, startOfMonth, isSameDay } from 'date-fns';
import { CalendarHeader, WeekDays, DayCell } from '@/app/components/main/calendar/CalendarComponents';
import { Note } from '@/entities/Note';
import { BasicResponse } from '@/types/NextResponse';

const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [isLoading, setIsLoading] = useState(true);
	const [notes, setNotes] = useState<Note[]>([]);

	const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const monthStart = startOfMonth(currentDate);
	const monthEnd = endOfMonth(currentDate);
	const startDayOffset = monthStart.getDay();
	const prevMonthDays = Array(startDayOffset)
		.fill(null)
		.map((_, i) => {
			const date = new Date(monthStart);
			date.setDate(date.getDate() - (startDayOffset - i));
			return date;
		});
	const currentMonthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
	const remainingDays = 42 - (prevMonthDays.length + currentMonthDays.length);
	const nextMonthDays = Array(remainingDays)
		.fill(null)
		.map((_, i) => {
			const date = new Date(monthEnd);
			date.setDate(date.getDate() + i + 1);
			return date;
		});
	const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => setIsLoading(false), 1000);
	}, [currentDate]);

	const fetchNotes = useCallback(async () => {
		try {
			const start = format(monthStart, 'MM-dd-yyyy');
			const end = format(monthEnd, 'MM-dd-yyyy');
			const response = await fetch(`/api/notes/calendar?startDate=${start}&endDate=${end}`, {
				method: 'GET',
			});

			if (!response.ok) throw new Error('Failed to share note');

			const json = (await response.json()) as BasicResponse;
			const notes = json.body.data as Note[];
			setNotes(notes);
		} catch (error) {
			console.error('Failed to share note:', error);
		}
	}, [monthStart, monthEnd]);

	useEffect(() => {
		fetchNotes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading) {
		return <CalendarSkeleton />;
	}

	return (
		<div className="w-full px-1 sm:px-4">
			<div className="bg-white rounded-lg shadow-lg p-2 sm:p-6">
				<CalendarHeader
					currentDate={currentDate}
					onPrevMonth={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
					onNextMonth={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
				/>
				<WeekDays daysShortNames={weekDays} />
				<div className="grid grid-cols-7 gap-1 sm:gap-4">
					{allDays.map((day) => {
						const note = !notes
							? notes
							: notes.find((n) => isSameDay(n.calendarDate as Date, day));
						return <DayCell key={format(day, 'yyyy-MM-dd')} day={day} currentDate={currentDate} note={note} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default Calendar;
