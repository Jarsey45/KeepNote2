import { FC } from 'react';
import { MenuItem } from './MenuItem';

export const Menu: FC = () => (
	<nav className="left-1/4 fixed w-1/2 h-12 bg-white shadow rounded-b-2xl">
		<ul className="h-full flex flex-row justify-evenly">
			<MenuItem content="My notes" href="/dashboard/notes" />
			<MenuItem content="Shared" href="/dashboard/shared" />
			<MenuItem content="Calendar" href="/dashboard/calendar" />
			<MenuItem content="Account" href="/dashboard/account" />
		</ul>
	</nav>
);
