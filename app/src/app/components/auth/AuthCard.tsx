import { FC, ReactNode, } from "react";

interface AuthCardProps {
	children: ReactNode;
	title?: string;
}

export const AuthCard: FC<AuthCardProps> = ({
	children,
	// title = "KeepNote",
}) => (
	<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
		<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
			<div className="text-center">
				<h1 className="text-4xl font-semibold text-gray-900">
					Keep<span className="text-emerald-500">Note</span>
				</h1>
			</div>
			{children}
		</div>
	</div>
);
