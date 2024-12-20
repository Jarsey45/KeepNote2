import type { NextConfig, } from "next";

const nextConfig: NextConfig = {
	webpack: (config, { isServer, }) => {
		if (!isServer) {
			config.watchOptions = {
				poll: 1000, // Check for changes every second
				aggregateTimeout: 300, // Delay before rebuilding
			};
		}
		return config;
	},
};

export default nextConfig;
