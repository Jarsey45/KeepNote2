import type { User as UserType } from '@/entities/User';
import { Trash2 } from 'lucide-react';

interface UserTableRowProps {
	user: UserType;
	onDelete: (id: string) => void;
}

export const UserTableRow = ({ user, onDelete }: UserTableRowProps) => (
	<tr key={user.id} className="hover:bg-gray-50">
		<td className="px-6 py-4">
			<div>
				<div className="font-medium text-gray-900">{user.nickname}</div>
				<div className="text-sm text-gray-500">{user.email}</div>
			</div>
		</td>
		<td className="px-6 py-4">
			<span
				className={`px-2 py-1 text-xs rounded-full ${
					user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
				}`}
			>
				{user.role}
			</span>
		</td>
		<td className="px-6 py-4 text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
		<td className="px-6 py-4">
			{user.role !== 'admin' && (
				<button
					onClick={() => onDelete(user.id)}
					className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50"
				>
					<Trash2 className="w-5 h-5" />
				</button>
			)}
		</td>
	</tr>
);
