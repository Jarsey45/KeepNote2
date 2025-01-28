import type { User as UserType } from '@/entities/User';
import { UserTableRow } from '@/app/components/main/admin/user-table/UserTableRow';
import { LoadingRows } from '@/app/components/main/admin/skeletons/UserManagementSkeletons';
import { UserTableHeader } from '@/app/components/main/admin/user-table/UserTableHeader';

interface UserTableProps {
	users: UserType[];
	loading: boolean;
	onDelete: (id: string) => void;
}

export const UserTable = ({ users, loading, onDelete }: UserTableProps) => (
	<div className="bg-white rounded-lg shadow">
		<div className="overflow-x-auto">
			<table className="w-full">
				<UserTableHeader />
				<tbody className="divide-y divide-gray-200">
					{loading ? (
						<LoadingRows />
					) : (
						users.map((user) => <UserTableRow key={user.id} user={user} onDelete={onDelete} />)
					)}
				</tbody>
			</table>
		</div>
	</div>
);
