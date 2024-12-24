import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	webpack: (config, { isServer }) => {
		if (!isServer) {} // disabled for development
		config.watchOptions = {
			poll: 800, // Check for changes every second
			aggregateTimeout: 300, // Delay before rebuilding
		};
		return config;
	},
	sassOptions: {
		includePaths: ['@/app/src/app/styles'],
	},
};

export default nextConfig;
