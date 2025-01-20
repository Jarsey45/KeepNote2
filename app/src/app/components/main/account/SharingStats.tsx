import { InfoCard } from '@/app/components/main/account/InfoCard';

type StatsProps = {
	shared: number;
	received: number;
	isLoading?: boolean;
};

export const SharingStats = ({ shared, received, isLoading }: StatsProps) => (
	<InfoCard title="Sharing statistics" className="bg-pink-100" isLoading={isLoading}>
		<div className="space-y-3">
			<div>
				<p className="text-sm text-gray-600">Shared</p>
				<p className="text-lg font-medium">{shared} notes</p>
			</div>
			<div>
				<p className="text-sm text-gray-600">Received</p>
				<p className="text-lg font-medium">{received} notes</p>
			</div>
		</div>
	</InfoCard>
);
