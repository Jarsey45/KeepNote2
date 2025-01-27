import React, { useState, useCallback } from 'react';
import { Search, UserPlus, X } from 'lucide-react';
import { Modal, ModalContent, ModalHeader, ModalBody, Input, Button } from '@nextui-org/react';

import { debounce } from '@/utils/_debounce';

interface User {
	id: string;
	email: string;
	nickname: string;
}

interface UserListItemProps {
	user: User;
	onSelect: (user: User) => void;
}

const UserListItem = ({ user, onSelect }: UserListItemProps) => (
	<li
		className="p-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center text-sm sm:text-base"
		onClick={() => onSelect(user)}
	>
		<span className="truncate flex-1">
			{user.nickname}
			<span className="text-gray-500 text-sm ml-1">({user.email})</span>
		</span>
		<UserPlus className="h-4 w-4 text-gray-500 flex-shrink-0 ml-2" />
	</li>
);

interface NoteShareFormProps {
	isOpen: boolean;
	onClose: () => void;
	noteId: string;
}

export const NoteShareForm = ({ isOpen, onClose, noteId }: NoteShareFormProps) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [users, setUsers] = useState<User[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const debouncedSearch = useCallback(
		debounce(async (term: string) => {
			if (term.length < 3) return;
			setIsLoading(true);

			try {
				const response = await fetch(`/api/users/search?term=${term}`);
				if (!response.ok) throw new Error('Failed to search users');

				const data = await response.json();
				setUsers(data.users);
			} catch (error) {
				console.error('Failed to search users:', error);
			} finally {
				setIsLoading(false);
			}
		}, 300),
		[]
	);

	const handleShare = async () => {
		try {
			const response = await fetch(`/api/notes/${noteId}/shared-with`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					userIds: selectedUsers.map((user) => user.id),
				}),
			});

			if (!response.ok) throw new Error('Failed to share note');
			onClose();
		} catch (error) {
			console.error('Failed to share note:', error);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="md">
			<ModalContent>
				<ModalHeader>Share Note</ModalHeader>
				<ModalBody className="gap-4">
					<div className="relative">
						<Input
							placeholder="Search users..."
							startContent={<Search className="text-gray-500" />}
							value={searchTerm}
							onChange={(e) => {
								setSearchTerm(e.target.value);
								debouncedSearch(e.target.value);
							}}
							isDisabled={isLoading}
						/>
					</div>

					{selectedUsers.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{selectedUsers.map((user) => (
								<div key={user.id} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm">
									<span>{user.nickname}</span>
									<button
										onClick={() => setSelectedUsers((users) => users.filter((u) => u.id !== user.id))}
										className="text-gray-500 hover:text-gray-700"
									>
										<X className="h-4 w-4" />
									</button>
								</div>
							))}
						</div>
					)}

					{users.length > 0 && (
						<ul className="max-h-48 overflow-y-auto border rounded divide-y">
							{users.map((user) => (
								<UserListItem
									key={user.id}
									user={user}
									onSelect={(user) => {
										if (!selectedUsers.find((u) => u.id === user.id)) {
											setSelectedUsers([...selectedUsers, user]);
										}
									}}
								/>
							))}
						</ul>
					)}

					<div className="flex justify-end gap-2 mb-4">
						<Button color="default" variant="light" onPress={onClose}>
							Cancel
						</Button>
						<Button color="primary" onPress={handleShare} isDisabled={selectedUsers.length === 0}>
							Share
						</Button>
					</div>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
