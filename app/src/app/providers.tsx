import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import AdminProviderWrapper from '@/app/providers/AdminProvider';

export async function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<AdminProviderWrapper>
				<NextUIProvider>{children}</NextUIProvider>
			</AdminProviderWrapper>
		</SessionProvider>
	);
}
