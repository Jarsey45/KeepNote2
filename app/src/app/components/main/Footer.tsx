'use client';

import FloatingActionButton from '@/app/components/shared/FloatingActionButton';
import PathNameEnum from '@/enums/PathName';
import { usePathname } from 'next/navigation';

export default function Footer() {
	const pathname = usePathname();
	const path = pathname.split('/')[1];

	return (
		<footer className="flex-[0.15]">
			{path == PathNameEnum.DASHBOARD && <FloatingActionButton />}
		</footer>
	);
}
