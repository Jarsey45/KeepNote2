"use client";

import { FC } from 'react';
import { MenuItem } from './MenuItem';
import { usePathname } from 'next/navigation';
import PathNameEnum from '@/enums/PathName';


export const Menu: FC = () => {
	const pathname = usePathname();

	const path = pathname.split('/')[1];

	return (
		<nav className="left-1/4 fixed w-1/2 h-12 bg-white shadow rounded-b-2xl overflow-hidden">
			<ul className="h-full flex flex-row justify-evenly">
				<MenuItem content="My notes" href="/dashboard" selected={path == PathNameEnum.DASHBOARD} />
				<MenuItem content="Shared" href="/shared-notes" selected={path == PathNameEnum.SHARED} />
				<MenuItem content="Calendar" href="/calendar" selected={path == PathNameEnum.CALENDAR} />
				<MenuItem content="Account" href="/account" selected={path == PathNameEnum.ACCOUNT} />
			</ul>
		</nav>
	);
};
