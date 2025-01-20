import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { Skeleton } from '@nextui-org/react';

type InfoCardProps = {
	title: string;
	children: React.ReactNode;
	className?: string;
	isLoading?: boolean;
};

export const InfoCard = ({ title, children, className = '', isLoading = false }: InfoCardProps) => (
	<Card className={`w-full ${className}`} shadow='none'>
		<CardHeader>
			<h2 className="text-xl font-semibold">{title}</h2>
		</CardHeader>
		<CardBody>
			{isLoading ? (
				<div className="space-y-4">
					<Skeleton className="h-4 w-3/4" />
					<Skeleton className="h-4 w-1/2" />
				</div>
			) : (
				children
			)}
		</CardBody>
	</Card>
);
