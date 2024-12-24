import { FC, ReactNode } from 'react';
import styles from '@/app/styles/components/auth/card.module.scss';

interface AuthCardProps {
	children: ReactNode;
	title?: string;
}

export const AuthCard: FC<AuthCardProps> = ({
	children,
	// title = "KeepNote",
}) => (
	<div
		id={styles.authCardContainer}
		className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
	>
		<div id={styles.authCard} className="max-w-md w-full space-y-8 bg-white p-16 rounded-lg shadow-md">
			<div className="text-center">
				<h1 className="text-6xl text-gray-900">
					Keep<span className={styles.highlight}>Note</span>
				</h1>
			</div>
			{children}
		</div>
	</div>
);
