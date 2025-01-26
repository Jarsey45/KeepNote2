'use client';

import { useCallback } from 'react';
import { BasicInfo } from '@/app/components/main/account/BasicInfo';
import { SharingStats } from '@/app/components/main/account/SharingStats';
import { CreditsHelp } from '@/app/components/main/account/Credits';

export default function AccountPage() {
	const handleResetPassword = useCallback(() => {
		// TODO: Implement password reset logic
	}, []);

	const handleDeleteAccount = useCallback(() => {
		// TODO: Implement account deletion logic
	}, []);

	return (
		<div className="flex flex-col min-h-screen w-full relative overflow-y-hidden">
			<div className="flex-grow p-4 md:p-6 max-w-4xl mx-auto h-screen bg-emerald-50 inset-x-0 -bottom-1/2 sm:-bottom-1/4 absolute">
				<div className="rounded-lg p-6 h-full">
					<div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 h-full">
						<BasicInfo nickname="TrueJohnDoe1" email="john.doe@example.com" />
						<SharingStats shared={1234} received={423} />
						<div className="md:col-span-2 h-1/2">
							<CreditsHelp onResetPassword={handleResetPassword} onDeleteAccount={handleDeleteAccount} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
