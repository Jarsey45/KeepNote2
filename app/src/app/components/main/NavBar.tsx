import { Menu } from '@/app/components/main/menu/Menu';

export default async function NavBar() {
	return (
		<header className="flex-[0.15] z-50">
			<Menu />
		</header>
	);
}
