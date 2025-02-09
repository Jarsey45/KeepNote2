import { InfoCard } from '@/app/components/main/account/InfoCard';

type BasicInfoProps = {
	id: string;
	nickname: string;
	email: string;
};

export const BasicInfo = ({ nickname, email, id }: BasicInfoProps) => (
	<InfoCard title="Basic information" className="bg-sky-100">
		<div className="space-y-4">
			<div>
				<p className="text-sm font-medium">Nickname</p>
				<p className="mt-1 text-gray-600">{nickname}</p>
			</div>
			<div>
				<p className="text-sm font-medium">Email</p>
				<p className="mt-1 text-gray-600">{email}</p>
			</div>
			<div>
				<p className="text-sm font-medium">ID</p>
				<p className="mt-1 text-gray-600">{id}</p>
			</div>
		</div>
	</InfoCard>
);
