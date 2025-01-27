import Link, { LinkProps } from 'next/link';
import { FC } from 'react';

interface MenuItemProps extends LinkProps {
	content: string;
	selected: boolean;
}

export const MenuItem: FC<MenuItemProps> = ({ content, selected, ...props }) => (
	<li className={`w-full h-full flex justify-center items-center hover:bg-emerald-50 hover:font-semibold ${selected ? 'bg-emerald-100 font-semibold' : ''}`}>
		<Link className="w-full h-full flex justify-center items-center" {...props}>{content}</Link>
	</li>
);
