'use client';

import React, { FC, MouseEvent, useEffect, useRef, useState } from 'react';
import { MoreHorizontal, Calendar, Trash2, Edit, Share2 } from 'lucide-react';
import NoteForm, { FormData } from '@/app/components/shared/NoteForm';
import { getRandomPastelColor } from '@/utils/_colors';
import { eventEmitter } from '@/utils/_emitter';
import { BasicResponse } from '@/types/NextResponse';
import { NoteDatePicker } from '@/app/components/shared/NoteDatePicker';
import { NoteShareForm } from '@/app/components/shared/NoteShareForm';

interface NoteProps {
	id: string;
	title?: string;
	content?: string;
	date?: string;
	color?: string;
}

interface ActionClickHandler {
	(action: string): void;
}

interface MenuClickHandler {
	(e: MouseEvent<HTMLButtonElement>): void;
}

const randomColorDefault = getRandomPastelColor();

const Note: FC<NoteProps> = ({
	id = '-1',
	title = 'Note Title',
	content = 'Note content',
	date = new Date().toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	}),
	color = randomColorDefault,
}) => {
	const menuRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [showMenu, setShowMenu] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showShareModal, setShowShareModal] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (event?.target === undefined) return;

			if (
				menuRef.current &&
				buttonRef.current &&
				!menuRef.current.contains(event.target as Node) &&
				!buttonRef.current.contains(event.target as Node)
			) {
				setShowMenu(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside as unknown as EventListener);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener);
		};
	}, []);

	const handleMenuClick: MenuClickHandler = (e) => {
		e.stopPropagation();
		setShowMenu(!showMenu);
	};

	const handleActionClick: ActionClickHandler = async (action) => {
		switch (action) {
			case 'delete': // deletes note
				const response = await fetch(`/api/notes/${id}`, {
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json' },
				});

				if (!response.ok) throw new Error('Failed to delete note'); //TODO: show some toast?

				console.log(await response.json());
				eventEmitter.emit('deleteNote');
				break;
			case 'share': // shraed not with other user
				setShowShareModal(true); // Show share modal
				break;
			case 'edit': // edits note
				setShowEditModal(true); // Show edit modal
				break;
			case 'calendar': // pins to user's calendar
				setShowDatePicker(true); // Show date picker
				break;
			default:
				console.warn('Action not defined');
				break;
		}
		setShowMenu(false);
	};

	const handleNoteUpdate = async (data: FormData) => {
		try {
			const response = await fetch(`/api/notes/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			if (!response.ok) throw new Error('Failed to update note');

			const json: BasicResponse = await response.json();

			if (json.status === 200) eventEmitter.emit('updateNote');
		} catch (error) {
			console.error('Failed to update note:', error);
			// TODO: Show error toast
		}
	};

	return (
		<>
			<div
				className={`relative w-64 h-64 rounded-lg p-6 shadow-lg snap-start scroll-ml-4 shrink-0 first:pl-4 last:pr-4" ${color}`}
			>
				{/* Header with title and More button */}
				<div className="flex justify-between items-start">
					<div className="space-y-1">
						<h2 className="text-xl font-semibold text-gray-800">{title}</h2>
						{content && <p className="text-gray-700">{content}</p>}
					</div>
					<button
						ref={buttonRef}
						onClick={handleMenuClick}
						className="p-1 hover:bg-black/10 rounded-full transition-colors"
					>
						<MoreHorizontal className="w-6 h-6 text-gray-700" />
					</button>
				</div>

				{/* Popup Menu */}
				{showMenu && (
					<div ref={menuRef} className="absolute right-4 top-12 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
						<button
							onClick={() => handleActionClick('share')}
							className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 flex items-center gap-2"
						>
							<Share2 className="w-4 h-4" /> share
						</button>
						<button
							onClick={() => handleActionClick('edit')}
							className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 flex items-center gap-2"
						>
							<Edit className="w-4 h-4" />
							edit
						</button>
						<button
							onClick={() => handleActionClick('delete')}
							className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-2"
						>
							<Trash2 className="w-4 h-4" />
							delete
						</button>
						<button
							onClick={() => handleActionClick('calendar')}
							className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 flex items-center gap-2"
						>
							<Calendar className="w-4 h-4" />
							pin to calendar
						</button>
					</div>
				)}

				{/* Date */}
				<div className="absolute bottom-6 left-6 text-sm text-gray-700">{date}</div>
			</div>

			{/* Edit Note Form Modal */}
			<NoteForm
				isOpen={showEditModal}
				onClose={() => setShowEditModal(false)}
				onSubmit={handleNoteUpdate}
				initialData={{ title, content }}
				mode="edit"
			/>

			<NoteDatePicker
				isOpen={showDatePicker}
				onClose={() => setShowDatePicker(false)}
				onDateSelect={(date) => {
					console.log('Note pinned to:', date);
					setShowDatePicker(false);
				}}
				noteId={id}
			/>

			<NoteShareForm
				isOpen={showShareModal}
				onClose={() => setShowShareModal(false)}
				noteId={id}
			/>
		</>
	);
};

export type Note = typeof Note;

export default Note;
