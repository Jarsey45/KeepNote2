'use client';

import { useCallback, useEffect, useState } from 'react';
import { BasicInfo } from '@/app/components/main/account/BasicInfo';
import { SharingStats } from '@/app/components/main/account/SharingStats';
import { CreditsHelp } from '@/app/components/main/account/Credits';
import { User } from '@/entities/User';
import { BasicResponse } from '@/types/NextResponse';

export default function AccountPage() {
	const [currentUser, setCurrentUser] = useState<User>();

	const handleResetPassword = useCallback(() => {
		// TODO: Implement password reset logic
	}, []);

	const handleDeleteAccount = useCallback(() => {
		// TODO: Implement account deletion logic
	}, []);

	const fetchUser = useCallback(async () => {
		const response = await fetch('/api/users/me');

		if (!response.ok) {
			const { body: { message } }: BasicResponse = await response.json();
			console.error(message);
			return;
		}

		const {
			status,
			body: { message, data },
		}: BasicResponse = await response.json();

		if (status !== 200) {
			console.error(message);
			return;
		}

		setCurrentUser(data as User);
	}, []);

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);


	return (
		<div className="flex flex-col justify-center min-h-screen w-full relative overflow-y-hidden">
			<div className="flex-grow h-3/4 p-4 md:p-6 max-w-4xl mx-auto bg-emerald-50 inset-x-0 absolute">
				<div className="rounded-lg p-6 h-full">
					<div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 h-full overflow-y-auto">
						{/* these should be skeletons */}
						<BasicInfo nickname={currentUser?.nickname ?? ''} email={currentUser?.email ?? ''} id={currentUser?.id ?? ''}/>
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
