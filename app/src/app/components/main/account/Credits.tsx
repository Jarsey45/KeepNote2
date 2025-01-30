import { Button } from '@nextui-org/react';
import { InfoCard } from '@/app/components/main/account/InfoCard';
import { redirect } from 'next/navigation';

type CreditsHelpProps = {
	onResetPassword: () => void;
	onDeleteAccount: () => void;
};

export const CreditsHelp = ({ onResetPassword, onDeleteAccount }: CreditsHelpProps) => (
	<InfoCard title="Credits and Help" className="bg-lime-300">
		<div className="space-y-4">
			<div>
				<p className="text-sm font-medium">Contact</p>
				<a href="mailto:support@keepnote.com" className="text-gray-600">
					support@keepnote.com
				</a>
			</div>
			<div className="flex flex-col space-y-2">
				<Button className="bg-yellow-200" onPress={onResetPassword}>
					Reset Password
				</Button>
				<Button onPress={onDeleteAccount} className="bg-red-500">
					Delete Account
				</Button>
				<Button onPress={() => redirect('/logout')} className="bg-sky-500">
					Log Out
				</Button>
			</div>
		</div>
	</InfoCard>
);
