'use client';

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), {
	ssr: false,
	loading: () => (
		<div className="flex justify-center items-center min-h-screen">
			<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
		</div>
	),
});

export default function ApiDoc() {
	return (
		<div className="container mx-auto py-4">
			<SwaggerUI url="/api/swagger" />
		</div>
	);
}
