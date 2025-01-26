import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, Input } from '@nextui-org/react';

interface DatePickerProps {
	isOpen: boolean;
	onClose: () => void;
	onDateSelect: (date: Date) => void;
	noteId: string;
}

export const NoteDatePicker = ({ isOpen, onClose, onDateSelect, noteId }: DatePickerProps) => {
	const [date, setDate] = useState<Date | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSelect = async (newDate: Date) => {
		setIsLoading(true);
		try {
			const response = await fetch(`/api/notes/${noteId}/calendar`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ date: newDate.toISOString() }),
			});

			if (!response.ok) throw new Error('Failed to pin note');

			onDateSelect(newDate);
			onClose();
		} catch (error) {
			console.error('Failed to pin note:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="sm">
			<ModalContent>
				<ModalHeader>Pin Note to Calendar</ModalHeader>
				<ModalBody className="gap-4">
					<Input type="date" className="w-full" onChange={(e) => setDate(e.target.valueAsDate)} />
					<div className="flex justify-end gap-2 mb-4">
						<Button color="default" variant="light" onPress={onClose}>
							Cancel
						</Button>
						<Button color="primary" onPress={() => date && handleSelect(date)} isDisabled={!date} isLoading={isLoading}>
							Pin to Calendar
						</Button>
					</div>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
