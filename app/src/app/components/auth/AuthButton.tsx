import { FC } from 'react';
import styles from '@/app/styles/components/auth/button.module.scss';

interface AuthButtonProps {
	content?: string;
}

export const AuthButton: FC<AuthButtonProps> = ({ content }) => (
	<div className='flex justify-center'>
		<button
			className={`${styles.authButton} w-3/4 px-3 py-2 border border-transparent text-base font-medium rounded-full text-white hover:bg-emerald-700 transition-all`}
		>
			{content}
		</button>
	</div>
);
