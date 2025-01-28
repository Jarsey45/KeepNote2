'use client';

import { Menu } from '@/app/components/main/menu/Menu';
import { useState } from 'react';


export default function NavBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="flex-[0.15] z-50">
			<button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden fixed top-4 left-4 z-50">
				<div
					className={`w-6 h-0.5 bg-emerald-700 transition-all duration-300 ${
						isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
					}`}
				/>
				<div className={`w-6 h-0.5 bg-emerald-600 my-1.5 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
				<div
					className={`w-6 h-0.5 bg-emerald-500 transition-all duration-300 ${
						isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
					}`}
				/>
			</button>
			<Menu isOpen={isMenuOpen} close={() => setIsMenuOpen(false)}/>
		</header>
	);
}
