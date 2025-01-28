'use client';

import { FC } from 'react';
import { MenuItem } from './MenuItem';
import { usePathname } from 'next/navigation';
import PathNameEnum from '@/enums/PathName';
import { useAdmin } from '@/app/context/AdminContext';

interface MenuProps {
	isOpen: boolean;
	close: () => void;
}

export const Menu: FC<MenuProps> = ({ isOpen, close }) => {
	const adminContext = useAdmin();
	const pathname = usePathname();
	const path = pathname.split('/')[1];

	return (
		<>
			{/* Desktop Menu */}
			<nav className="hidden md:block left-1/4 fixed w-1/2 h-12 bg-white shadow rounded-b-2xl overflow-hidden">
				<ul className="h-full flex flex-row justify-evenly">
					<MenuItem content="My notes" href="/dashboard" selected={path === PathNameEnum.DASHBOARD} />
					<MenuItem content="Shared" href="/shared-notes" selected={path === PathNameEnum.SHARED} />
					<MenuItem content="Calendar" href="/calendar" selected={path === PathNameEnum.CALENDAR} />
					<MenuItem content="Account" href="/account" selected={path === PathNameEnum.ACCOUNT} />
					{adminContext.isAdmin && <MenuItem content="Admin" href="/admin" selected={path === PathNameEnum.ADMIN} />}
				</ul>
			</nav>

			{/* Mobile Menu */}
			<nav
				className={`md:hidden fixed left-0 top-0 w-64 h-screen bg-emerald-50 transform transition-transform duration-300 z-40 ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<div className="relative">
					<div className="pt-16">
						<div className="px-6 pb-8">
							<h1 className="text-emerald-800 text-2xl text-center font-semibold">
								Keep<span className="text-emerald-400">Note</span>
							</h1>
						</div>
						<ul className="flex flex-col space-y-4">
							<MenuItem
								content="My notes"
								href="/dashboard"
								selected={path === PathNameEnum.DASHBOARD}
								className="px-8 py-4 text-emerald-700 hover:bg-emerald-100"
								onClick={close}
							/>
							<MenuItem
								content="Shared"
								href="/shared-notes"
								selected={path === PathNameEnum.SHARED}
								className="px-8 py-4 text-emerald-700 hover:bg-emerald-100"
								onClick={close}
							/>
							<MenuItem
								content="Calendar"
								href="/calendar"
								selected={path === PathNameEnum.CALENDAR}
								className="px-8 py-4 text-emerald-700 hover:bg-emerald-100"
								onClick={close}
							/>
							<MenuItem
								content="Account"
								href="/account"
								selected={path === PathNameEnum.ACCOUNT}
								className="px-8 py-4 text-emerald-700 hover:bg-emerald-100"
								onClick={close}
							/>
							{adminContext.isAdmin && (
								<MenuItem
									content="Admin"
									href="/admin"
									selected={path === PathNameEnum.ADMIN}
									className="px-8 py-4 text-emerald-700 hover:bg-emerald-100"
									onClick={close}
								/>
							)}
						</ul>
					</div>
				</div>
			</nav>
			<div
				className={`md:hidden absolute -z-10 bg-opacity-15 bg-black h-screen w-screen transition-all top-0 ${
					isOpen ? 'opacity-100 left-0' : 'opacity-0 -left-3/4'
				}`} onClick={close}
			></div>
		</>
	);
};
